import React from 'react';
import ReactDOM from 'react-dom';
import { ImportMapper } from 'import-mapper';

import { Console, Stream, Effect, Cause } from 'effect';
import * as BrowserHttp from '@effect/platform-browser/HttpClient';
//import { BrowserContext } from '@effect/platform-browser';
import * as Http from '@effect/platform/HttpClient';


import { NonIdealState, Spinner } from '@blueprintjs/core';

//import './normalize.css';
//import 'jsondiffpatch/dist/formatters-styles/annotated.css';
//import 'jsondiffpatch/dist/formatters-styles/html.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import 'react-resizable/css/styles.css';

import usePersistentStateReducer from '@riboseinc/paneron-extension-kit/usePersistentStateReducer.js';
import ErrorBoundary from '@riboseinc/paneron-extension-kit/widgets/ErrorBoundary.js';
import type { RendererPlugin, DatasetContext } from '@riboseinc/paneron-extension-kit/types/index.js';
import type { PersistentStateReducerHook } from '@riboseinc/paneron-extension-kit/usePersistentStateReducer.js';


console.debug("hi");

const container = document.getElementById('app')!;

let globalBytesToReceive = 0;
let globalBytesReceived = 0;
let loading = true;

const byteFormatter = Intl.NumberFormat(navigator.language, {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});

function renderLoader() {
  if (loading) {
    ReactDOM.render(
      <Loader
        total={globalBytesToReceive}
        done={globalBytesReceived}
      />,
      container,
    );
    setTimeout(() => requestAnimationFrame(renderLoader), 50);
  }
}

renderLoader();

function Loader({ total, done }: { total: number, done: number }) {
  const value = done && total && total > 0 && total !== done
    ? done / total
    : undefined;
  return <NonIdealState
    className="loaderWrapper"
    icon={<Spinner
      className="loader"
      {...(value ? { value } : {})}
    />}
    title="Downloading dataset & extension"
    description={`${byteFormatter.format(done)} of ${byteFormatter.format(total)}`}
  />;
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


const VALUE_HOOK_STUB = {
    errors: [] as string[],
    isUpdating: false,
    _reqCounter: 0,
    refresh: () => {},
} as const;


function useGlobalSettings() {
  return {
    value: {
      settings: { mainNavbarPosition: 'top', sidebarPosition: 'left', defaultTheme: 'light' },
    },
    ...VALUE_HOOK_STUB,
  } as const;
}


const App: React.FC<any> = ({ View, ctx }: {
  View: NonNullable<RendererPlugin["mainView"]>,
  ctx: DatasetContext,
}) => {
  return (
    <ErrorBoundary viewName="main dataset view">
      <View {...ctx} />
    </ErrorBoundary>
  );
}


async function renderApp () {
  const [plugin, data] = await (fetchPrerequisites2().pipe(
    Effect.provide(BrowserHttp.client.layer),
    Effect.runPromise,
  ));

  loading = false;

  const ctx: DatasetContext = {
    title: "TBD",
    useGlobalSettings,
    logger: console,
    usePersistentDatasetStateReducer: (...opts) => {
      const effectiveOpts:
      Parameters<PersistentStateReducerHook<any, any>> =
      React.useMemo((() => [
        // opts[0] is the storage key in the list of positional parameters.
        // Extension code should specify locally scoped key,
        // and this takes care of additionally scoping it by repository and dataset.
        opts[0],

        opts[1], opts[2],

        opts[3], opts[4], opts[5],
      ]), [...[...Array(6).keys()].map(k => opts[k])]);
      return usePersistentStateReducer(() => {}, async () => ({}), ...effectiveOpts);
    },
    useObjectData: function ({ objectPaths, nounLabel }) {
      return {
        ...VALUE_HOOK_STUB,
        value: { data: {} },
      };
    },
    useRemoteUsername: function () {
      return {
        ...VALUE_HOOK_STUB,
        value: {},
      };
    },
    useSettings: function () {
      return {
        ...VALUE_HOOK_STUB,
        value: { settings: {} },
      };
    },
    useMapReducedData: function ({ chains }) {
      return {
        ...VALUE_HOOK_STUB,
        value:
          Object.keys(chains).
            map((cid) => ({ [cid]: {} })).
            reduce((prev, curr) => ({ ...prev, ...curr }), {}),
      };
    },
  };

  console.debug("Got plugin and data", plugin, data);

  ReactDOM.render(
    <App View={plugin.mainView!} ctx={ctx} />,
    container,
  );
};


renderApp().
  catch(e =>
    ReactDOM.render(
      <NonIdealState
        icon="heart-broken"
        title="Failed to load extension or dataset"
        className="loaderWrapper"
        description={<>
          <p>
            A networking error is a likely cause.
            <br />
            Reloading the page may help.
            <br />
            More (probably unhelpful) details below.
          </p>
          <pre>
            {String(e)}
          </pre>
        </>}
      />,
      container,
    )
  ).
  finally(() => {
    loading = false;
  });


function fetchPrerequisites2():
Effect.Effect<
  BrowserHttp.client.Client.Default,
  BrowserHttp.error.HttpClientError | Cause.UnknownException,
  [RendererPlugin, Record<string, Record<string, unknown>>]>
{
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
          const { 'default': maybePluginPromise } = yield * _(
            Console.withTime("dynamically import extension code")
              (Effect.tryPromise(() => import(url))),
          );
          const _plugin: any = yield * _(Effect.tryPromise(() => maybePluginPromise));
          if (_plugin.mainView) {
            return _plugin as RendererPlugin;
          } else {
            throw Effect.fail("obtained extension does not expose `mainView`");
          }
        })),
      Console.withTime("load data")
        (Effect.gen(function * (_) {
          const jsonString = yield * _(
            Console.withTime("fetch data.json")
              (fetchOne('./data.json'))
          );
          const data: Record<string, Record<string, unknown>> =
            yield * _(Effect.try(() => JSON.parse(jsonString)));
          return data;
        })),
    ],
    { concurrency: 5 },
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
