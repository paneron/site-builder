import * as React from 'react';

import { ImportMapper } from 'import-mapper';

import { pipe, Console, Stream, Effect } from 'effect';
import * as S from '@effect/schema/Schema';
import * as Http from '@effect/platform/HttpClient';

import { isObject } from '@riboseinc/paneron-extension-kit/util';
import type { RendererPlugin } from '@riboseinc/paneron-extension-kit/types/index.js';

import { DatasetSchema, ManifestSchema } from './dataset';
import { getDB, storeItem, getItem } from './db';


let totalWorkUnits = 0;
let completedWorkUnits = 0;
let workStage: 'fetching' | 'processing' = 'fetching';


let repeatTimeout: null | ReturnType<Window["setTimeout"]> = null;
export function repeatWhileLoading(func: (done: number, total: number, stage: typeof workStage) => void) {
  repeatTimeout = setTimeout(
    () => {
      func(completedWorkUnits, totalWorkUnits, workStage);
      repeatWhileLoading(func);
    },
    100,
  ) as unknown as ReturnType<Window["setTimeout"]>; // XXX: wut?
  return function cleanUp() { repeatTimeout ? clearTimeout(repeatTimeout) : void 0; };
}


/** Returns an object with all imports allowed within an extension. */
async function getExtensionImports(): Promise<Record<string, unknown>> {
  return {
    'react': { default: React },
    '@emotion/styled': await import('@emotion/styled'),
    '@emotion/react': await import('@emotion/react'),
    '@blueprintjs/core': (await import('@blueprintjs/core')),
    '@blueprintjs/popover2': (await import('@blueprintjs/popover2')),
    '@blueprintjs/select': (await import('@blueprintjs/select')),
    // 'react-mathjax2': await import('react-mathjax2'),
    // 'liquidjs': await import('liquidjs'),
    // 'js-yaml': await import('js-yaml'),
    // 'asciidoctor': await import('asciidoctor'),
    'immutability-helper': await import('immutability-helper'),
    'date-fns/format': await import('date-fns/format'),
    'date-fns/parse': await import('date-fns/parse'),

    'liquidjs': await import('liquidjs'),
    'react-mathjax2': await import('react-mathjax2'),

    '@riboseinc/paneron-extension-kit': (await import('@riboseinc/paneron-extension-kit')),
    '@riboseinc/paneron-extension-kit/context': (await import('@riboseinc/paneron-extension-kit/context.js')),
    '@riboseinc/paneron-registry-kit': (await import('@riboseinc/paneron-registry-kit')),
    '@riboseinc/paneron-registry-kit/types': await import('@riboseinc/paneron-registry-kit/types/index.js'),
    '@riboseinc/paneron-registry-kit/migrations/initial': await import('@riboseinc/paneron-registry-kit/migrations/initial.js'),
    '@riboseinc/paneron-registry-kit/views': await import('@riboseinc/paneron-registry-kit/views'),
    '@riboseinc/paneron-registry-kit/views/FilterCriteria/CRITERIA_CONFIGURATION': (await import('@riboseinc/paneron-registry-kit/views/FilterCriteria/CRITERIA_CONFIGURATION.js')),
    '@riboseinc/paneron-registry-kit/views/util': (await import('@riboseinc/paneron-registry-kit/views/util.js')),
    '@riboseinc/paneron-registry-kit/views/BrowserCtx': (await import('@riboseinc/paneron-registry-kit/views/BrowserCtx.js')),
    '@riboseinc/paneron-registry-kit/views/itemPathUtils': (await import('@riboseinc/paneron-registry-kit/views/itemPathUtils.js')),
  };
}

/**
 * Uses importMapper to make select dependencies available within code
 * that was dynamically `import()`ed from an object URL
 * (see `plugins.renderer.getPlugin()` for where that happens).
 */
async function setUpExtensionImportMap() {
  const deps = await getExtensionImports();

  const imports: Record<string, string> = {};
  for (const [moduleID, moduleData] of Object.entries(deps)) {
    const m = moduleData as any;
    //console.debug("processing import", moduleID, m);
    const d = m.default // && Object.keys(m).length === 1 // only default export
      ? ImportMapper.forceDefault(m.default)
      : null;
    if (d || moduleData) {
      imports[moduleID] = d ?? moduleData;
    }
  }

  const mapper = new ImportMapper(imports);
  mapper.register();

  return deps;
}


function loadDataFull() {
  return Console.withTime("load data (full)")
    (Effect.gen(function * (_) {
      const [manifestJSON, dataJSON] = yield * _(
        Console.withTime("load data.json & manifest.json")
          (Effect.all([
            fetchOne('./manifest.json'),
            fetchOne('./data.json'),
          ], { concurrency: 5 })),
      );
      const [manifest, data] = yield * _(
        Console.withTime("parse data.json & manifest.json")
          (Effect.all([
            S.parse(S.parseJson(ManifestSchema))(manifestJSON),
            S.parse(S.parseJson(DatasetSchema))(dataJSON),
          ], { concurrency: 5 })),
      );
      workStage = 'processing';
      totalWorkUnits += Object.keys(data).length * 1000;
      const dataParsed = yield * _(
        Console.withTime("post-process deserialized data")
          (pipe(
            Stream.fromIterable(Object.entries(data)).pipe(
              // XXX: This would ensure that below doesn’t freeze GUI while processing happens,
              // but it also makes processing too slow for some reason.
              //Stream.schedule(Schedule.spaced(Duration.zero)),
              Stream.tap((() => Effect.sync(() => { completedWorkUnits += 1000 }))),
              Stream.mapEffect(
                ([objPath, objData]) =>
                  Effect.try(() =>
                    ({ [objPath]: parseData(objData) as Record<string, unknown> })
                  ),
                { concurrency: 50 },
              ),
              Stream.runFold(
                {} as Record<string, Record<string, unknown>>,
                (prev, curr) => ({ ...prev, ...curr }),
              ),
            ),
            Effect.flatMap(d => S.parse(DatasetSchema)(d)),
          )),
      );
      return { manifest, data: dataParsed };
    }));
}


export function loadExtensionAndDataset(
  /** If true, will increment DB version & rebuild it by downloading data again. */
  ignoreCache = true,
) {
  totalWorkUnits = 0;
  completedWorkUnits = 0;
  return Effect.all(
    [
      Console.withTime("load plugin")
        (Effect.gen(function * (_) {
          const [, code] = yield * _(
            Effect.all([
              Console.withTime("set up import map")
                (Effect.tryPromise(() => setUpExtensionImportMap())),
              Console.withTime("fetch extension.js")
                (fetchOne('./extension.js')),
            ]),
          );
          const blob = new Blob([code], { type: 'text/javascript' });
          const url = URL.createObjectURL(blob);
          Effect.logDebug("importing plugin");
          const { 'default': maybePluginPromise } = yield * _(
            Console.withTime("dynamically import extension code")
              (Effect.tryPromise(() => import(url))),
            Effect.tapError((e) => Effect.sync(() => console.error("failed to import", String(e)))),
          );
          const _plugin: any = yield * _(Effect.tryPromise(() => maybePluginPromise));
          if (_plugin.mainView) {
            Effect.logDebug("got plugin");
            return _plugin as RendererPlugin;
          } else {
            Effect.logError("not a valid plugin");
            throw Effect.fail("obtained extension does not expose `mainView`");
          }
        })),
      Console.withTime("load data")
        (Effect.scoped(Effect.gen(function * (_) {

          const dbVersion = 1;
          // const dbVersion = yield * _(
          //   Effect.try(() => {
          //     const storedVersionString = localStorage.getItem('dbVersion');
          //     const storedVersion = parseInt(storedVersionString ?? '1', 10);
          //     const effectiveVersion = ignoreCache
          //       ? storedVersion + 1
          //       : storedVersion;
          //     const effectiveVersionString = `${effectiveVersion}`;
          //     if (!storedVersionString || effectiveVersionString !== storedVersionString) {
          //       localStorage.setItem('dbVersion', effectiveVersionString);
          //     }
          //     return effectiveVersion;
          //   }),
          // );

          const db = yield * _(getDB('cache', 1, {
            fileCache: { keyPath: 'filePath' },
            misc: { keyPath: 'id' },
            dataset: { keyPath: 'objPath' },
          }, ignoreCache));
          yield * _(Effect.log(`Using DB version ${dbVersion}`));

          const STORE_NAME = 'misc';
          const PARSED_DATASET_KEY = 'parsed-dataset';

          yield * _(Effect.log("Obtaining parsed data, trying cache first"));

          const { data, manifest } = yield * _(
            getItem(
              db,
              STORE_NAME,
              PARSED_DATASET_KEY,
              S.struct({
                id: S.literal(PARSED_DATASET_KEY),
                data: DatasetSchema,
                manifest: ManifestSchema,
              }),
            ),
            Effect.tapBoth({
              onSuccess: () => Effect.log("Obtained cached data"),
              onFailure: () => Effect.log("Could not obtain cached data, will download"),
            }),
            // If getting cached items failed, we’ll fetch in full
            // and then cache.
            Effect.orElse(() => pipe(
              loadDataFull(),
              Effect.tap(() => Effect.log("Downloaded data")),
              Effect.flatMap(({ manifest, data }) =>
                storeItem(db, STORE_NAME, { id: PARSED_DATASET_KEY, data, manifest })
              ),
              Effect.tap(() => Effect.log("Cached downloaded data")),
            )),
            Effect.map(({ data, manifest }) => ({ data, manifest })),
          );

          yield * _(Effect.log("Obtained parsed data"));

          return { data, manifest };
        }))),
    ],
    { concurrency: 5 },
  );
}


function fetchOne (path: string) {
  return Effect.gen(function * (_) {
    const client = yield * _(Http.client.Client);

    yield * _(Effect.log(`Loading raw ${path}`));

    const response = yield * _(
      Http.request.get(path),
      client,
      Effect.tap(({ headers }) => Effect.sync(() => {
        totalWorkUnits += parseInt(headers['content-length']!, 10);
      })),
      Effect.map((_) => _.stream),
      Stream.unwrap,
      Stream.tap((arr) => Effect.sync(() => {
        completedWorkUnits += arr.length;
      })),
      Stream.runFold("", (a, b) => a + new TextDecoder().decode(b)),
    );

    yield * _(Effect.log(`Loaded raw ${path}`));

    return response;
  });
}


/**
 * Recursively processes deserialized object data, additionally deserializing:
 *
 * - String ISO timestamps into Date instances.
 */
function parseData(val: unknown, _seen?: WeakSet<any>) {
  const seen = _seen ?? new WeakSet();

  if (seen.has(val)) {
    return val;
  }

  if (val && isObject(val)) {
    seen.add(val);
    return Object.entries(val as Record<string, unknown>).
      map(([k, v]): Record<string, unknown> => ({ [k]: parseData(v, seen) })).
      reduce((prev, curr) => ({ ...prev, ...curr }), {});
  } else if (val && Array.isArray(val)) {
    // XXX: If array can be added to “seen”, it should.
    return val.map((val): unknown => parseData(val, seen));
  } else if (typeof val === 'string') {
    return maybeDate(val);
  } else {
    return val;
  }
}

/** If string is a valid ISO date, returns Date; otherwise the string itself. */
function maybeDate(val: string): Date | string {
  try {
    const date = _parseDate(val);
    const fullISO = date.toISOString();
    if (fullISO === val || fullISO.split('T')[0] === val) {
      return date;
    } else {
      return val;
    }
  } catch (e) {
    return val;
  }
}
const _parseDate = S.parseSync(S.Date);
