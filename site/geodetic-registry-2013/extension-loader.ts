import React from 'react';

import { ImportMapper } from 'import-mapper';

import { pipe, Console, Stream, Effect, Cause } from 'effect';
import * as BrowserHttp from '@effect/platform-browser/HttpClient';
import * as Http from '@effect/platform/HttpClient';

import type { RendererPlugin } from '@riboseinc/paneron-extension-kit/types/index.js';


let globalBytesToReceive = 0;
let globalBytesReceived = 0;
let loading = true;


function leaveLoadingState() {
  loading = false;
}

export function repeatWhileLoading(func: (done: number, total: number) => void) {
  if (loading) {
    const cb = () => func(globalBytesReceived, globalBytesToReceive);
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
    console.debug("processing import", moduleID, m);
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


export function loadExtensionAndDataset():
Effect.Effect<
  BrowserHttp.client.Client.Default,
  BrowserHttp.error.HttpClientError | Cause.UnknownException,
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
            const data: Record<string, Record<string, unknown>> = yield * _(
              Console.withTime("parse data.json")
                (Effect.try(() => JSON.parse(jsonString))),
            );
            Effect.logDebug("got data");
            return data;
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


function fetchOne (path: string) {
  return Effect.gen(function * (_) {
    const client = yield * _(Http.client.Client)
    const response = yield * _(
      Http.request.get(path),
      client,
      Effect.tap(({ headers }) => Effect.sync(() => {
        globalBytesToReceive += parseInt(headers['content-length']!, 10);
      })),
      Effect.map((_) => _.stream),
      Stream.unwrap,
      Stream.tap((arr) => Effect.sync(() => {
        globalBytesReceived += arr.length;
      })),
      Stream.runFold("", (a, b) => a + new TextDecoder().decode(b)),
    );
    return response;
  });
}
