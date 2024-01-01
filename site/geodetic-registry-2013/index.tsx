import React from 'react';
import ReactDOM from 'react-dom';
import { ImportMapper } from 'import-mapper';

import { NonIdealState, Spinner } from '@blueprintjs/core';

import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
//import 'jsondiffpatch/dist/formatters-styles/annotated.css';
//import 'jsondiffpatch/dist/formatters-styles/html.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import 'react-resizable/css/styles.css';
import './site.css';
//import './normalize.css';
//import './renderer.css';

import usePersistentStateReducer from '@riboseinc/paneron-extension-kit/usePersistentStateReducer.js';
import ErrorBoundary from '@riboseinc/paneron-extension-kit/widgets/ErrorBoundary.js';
import type { RendererPlugin } from '@riboseinc/paneron-extension-kit/types/index.js';
import type { PersistentStateReducerHook } from '@riboseinc/paneron-extension-kit/usePersistentStateReducer.js';


console.debug("hi");

//import { plugin } from '#ext';

//const container = ReactDOM.createRoot(document.getElementById('app')!);
const container = document.getElementById('app')!;

ReactDOM.render(<Loader />, container);

function Loader() {
  return <NonIdealState className="loaderWrapper" title={<Spinner className="loader" />} description="Loading…" />;
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


const App: React.FC<any> = ({ View }: { View: NonNullable<RendererPlugin["mainView"]> }) => {
  console.debug("boundary", ErrorBoundary);
  console.debug("reducer", usePersistentStateReducer);
  return (
    <ErrorBoundary viewName="Main view">
      <View
        useGlobalSettings={() => ({
          value: {
            settings: { mainNavbarPosition: 'top', sidebarPosition: 'left', defaultTheme: 'light' },
          },
          errors: [],
          isUpdating: false,
          _reqCounter: 0,
          refresh: () => {},
        })}
        usePersistentDatasetStateReducer={
          (...opts) => {
            const effectiveOpts: Parameters<PersistentStateReducerHook<any, any>> = React.useMemo((() => [
              // opts[0] is the storage key in the list of positional parameters.
              // Extension code should specify locally scoped key,
              // and this takes care of additionally scoping it by repository and dataset.
              opts[0],

              opts[1], opts[2],

              opts[3], opts[4], opts[5],
            ]), [...[...Array(6).keys()].map(k => opts[k])]);
            return usePersistentStateReducer(() => {}, async () => ({}), ...effectiveOpts);
          }
        }
      />
    </ErrorBoundary>
  );
}


(async function renderApp () {
  await setUpExtensionImportMap();

  //const plugin = (await import('#ext')).default;
  const code = await (await fetch('./extension.js')).text();
  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const { 'default': maybePluginPromise } = await import(/* webpackIgnore: true */ url);

  const _plugin = await maybePluginPromise;

  let plugin: RendererPlugin;
  if (_plugin.mainView) {
    plugin = _plugin as RendererPlugin;
  } else {
    ReactDOM.render(<NonIdealState icon="heart-broken" description="Failed to load extension" />, container);
    return;
  }

  const data = await (await fetch('./data.json')).json();

  console.debug("got some data", data);

  //const usePersistentStateReducer: any = (await import('@riboseinc/paneron-extension-kit/usePersistentStateReducer.js')).default.default
  //const ErrorBoundary: any = (await import('@riboseinc/paneron-extension-kit/widgets/ErrorBoundary.js')).default.default

  ReactDOM.render(
    <App View={plugin.mainView!} />,
    container,
  );
})();
