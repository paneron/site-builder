import React from 'react';

import { ImportMapper } from 'import-mapper';

import { pipe, Console, Schedule, Duration, Stream, Effect, Cause } from 'effect';
import * as S from '@effect/schema/Schema';
import { ParseError } from '@effect/schema/ParseResult';
import * as BrowserHttp from '@effect/platform-browser/HttpClient';
import * as Http from '@effect/platform/HttpClient';

import { isObject } from '@riboseinc/paneron-extension-kit/util';
import type { RendererPlugin } from '@riboseinc/paneron-extension-kit/types/index.js';


let totalWorkUnits = 0;
let completedWorkUnits = 0;
let workStage: 'fetching' | 'processing' = 'fetching';
let loading = true;


function leaveLoadingState() {
  loading = false;
}

export function repeatWhileLoading(func: (done: number, total: number, stage: typeof workStage) => void) {
  if (loading) {
    const cb = () => func(completedWorkUnits, totalWorkUnits, workStage);
    cb();
    setTimeout(() =>
      requestAnimationFrame(() =>
        repeatWhileLoading(cb)
      ), 50);
  }
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


export function loadExtensionAndDataset(ignoreCache = false):
Effect.Effect<
  BrowserHttp.client.Client.Default,
  BrowserHttp.error.HttpClientError | ParseError | Cause.UnknownException,
  [RendererPlugin, Record<string, Record<string, unknown>>]>
{
  return pipe(
    Effect.all(
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
          (Effect.gen(function * (_) {
            const jsonString = yield * _(
              Console.withTime("fetch data.json")
                (fetchOne('./data.json')),
            );
            const data = yield * _(
              Console.withTime("deserialize data")
                (S.parse(S.parseJson(DatasetSchema))(jsonString)),
            );
            workStage = 'processing';
            totalWorkUnits += Object.keys(data).length * 1000;
            const dataParsed = yield * _(
              Console.withTime("post-process deserialized data")
                (pipe(
                  Stream.fromIterable(Object.entries(data)).pipe(
                    Stream.schedule(Schedule.spaced(Duration.zero)),
                    Stream.tap((() => Effect.sync(() => { completedWorkUnits += 1000 }))),
                    Stream.mapEffect(([objPath, objData]) =>
                      Effect.try(() =>
                        ({ [objPath]: parseData(objData) as Record<string, unknown> })
                      ),
                    ),
                    Stream.runFold(
                      {} as Record<string, Record<string, unknown>>,
                      (prev, curr) => ({ ...prev, ...curr }),
                    ),
                  ),
                  Effect.flatMap(d => S.parse(DatasetSchema)(d)),
                )),
            );
            return dataParsed;
          })),
      ],
      { concurrency: 5 },
    ),
    Effect.tapBoth({
      onFailure: () => Effect.sync(leaveLoadingState),
      onSuccess: () => Effect.sync(leaveLoadingState),
    }),
  );
}


const DatasetSchema = S.record(S.string, S.record(S.string, S.unknown));


function fetchOne (path: string) {
  return Effect.gen(function * (_) {
    const client = yield * _(Http.client.Client)
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
