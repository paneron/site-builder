import React from 'react';
import ReactDOM from 'react-dom';
import { ImportMapper } from 'import-mapper';


import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
//import 'jsondiffpatch/dist/formatters-styles/annotated.css';
//import 'jsondiffpatch/dist/formatters-styles/html.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import 'react-resizable/css/styles.css';
import './site.css';
//import './normalize.css';
//import './renderer.css';
console.debug("hi");

//import { plugin } from '#ext';

//const container = ReactDOM.createRoot(document.getElementById('app')!);
const container = document.getElementById('app')!;

ReactDOM.render(<Loader />, container);

function Loader() {
  console.debug("rendering app");
  return <div>Loading...</div>;
}



// /** Returns an object with all imports allowed within an extension. */
// function getDeps(): Record<string, unknown> {
//   return {
//     'react': import('react'),
//     '@emotion/styled': import('@emotion/styled'),
//     '@emotion/react': import('@emotion/react'),
//     '@blueprintjs/core': import('@blueprintjs/core'),
//     '@blueprintjs/popover2': import('@blueprintjs/popover2'),
//     '@blueprintjs/select': import('@blueprintjs/select'),
// 
//     //'react-mathjax2': import('react-mathjax2'),
//     //'liquidjs': import('liquidjs'),
//     //'js-yaml': import('js-yaml'),
//     //'asciidoctor': import('asciidoctor'),
// 
//     'immutability-helper': import('immutability-helper'),
//     'date-fns/format': import('date-fns/format'),
//     'date-fns/parse': import('date-fns/parse'),
// 
//     '@riboseinc/paneron-extension-kit': import('@riboseinc/paneron-extension-kit'),
//     '@riboseinc/paneron-registry-kit': import('@riboseinc/paneron-registry-kit'),
//     '@riboseinc/paneron-registry-kit/migrations/initial': import('@riboseinc/paneron-registry-kit/migrations/initial.js'),
//     '@riboseinc/paneron-registry-kit/views': import('@riboseinc/paneron-registry-kit/views'),
//     '@riboseinc/paneron-registry-kit/views/FilterCriteria/CRITERIA_CONFIGURATION': import('@riboseinc/paneron-registry-kit/views/FilterCriteria/CRITERIA_CONFIGURATION.js'),
//     '@riboseinc/paneron-registry-kit/views/util': import('@riboseinc/paneron-registry-kit/views/util.js'),
//     '@riboseinc/paneron-registry-kit/views/BrowserCtx': import('@riboseinc/paneron-registry-kit/views/BrowserCtx.js'),
//     '@riboseinc/paneron-registry-kit/views/itemPathUtils': import('@riboseinc/paneron-registry-kit/views/itemPathUtils.js'),
//     '@riboseinc/paneron-extension-kit/context': import('@riboseinc/paneron-extension-kit/context.js'),
//   }
// }

/** Returns an object with all imports allowed within an extension. */
async function getDeps(): Promise<Record<string, unknown>> {
  return {
    'react': await import('react'),
    '@emotion/styled': await import('@emotion/styled'),
    '@emotion/react': await import('@emotion/react'),
    '@blueprintjs/core': (await import('@blueprintjs/core')).default,
    '@blueprintjs/popover2': (await import('@blueprintjs/popover2')).default,
    '@blueprintjs/select': (await import('@blueprintjs/select')).default,
    // 'react-mathjax2': await import('react-mathjax2'),
    // 'liquidjs': await import('liquidjs'),
    // 'js-yaml': await import('js-yaml'),
    // 'asciidoctor': await import('asciidoctor'),
    'immutability-helper': await import('immutability-helper'),
    'date-fns/format': await import('date-fns/format'),
    'date-fns/parse': await import('date-fns/parse'),

    '@riboseinc/paneron-extension-kit': (await import('@riboseinc/paneron-extension-kit')).default,
    '@riboseinc/paneron-extension-kit/context': (await import('@riboseinc/paneron-extension-kit/context.js')).default,
    '@riboseinc/paneron-registry-kit': (await import('@riboseinc/paneron-registry-kit')).default,
    '@riboseinc/paneron-registry-kit/types': await import('@riboseinc/paneron-registry-kit/types/index.js'),
    '@riboseinc/paneron-registry-kit/migrations/initial': await import('@riboseinc/paneron-registry-kit/migrations/initial.js'),
    '@riboseinc/paneron-registry-kit/views': await import('@riboseinc/paneron-registry-kit/views'),
    '@riboseinc/paneron-registry-kit/views/FilterCriteria/CRITERIA_CONFIGURATION': (await import('@riboseinc/paneron-registry-kit/views/FilterCriteria/CRITERIA_CONFIGURATION.js')).default,
    '@riboseinc/paneron-registry-kit/views/util': (await import('@riboseinc/paneron-registry-kit/views/util.js')).default,
    '@riboseinc/paneron-registry-kit/views/BrowserCtx': (await import('@riboseinc/paneron-registry-kit/views/BrowserCtx.js')).default,
    '@riboseinc/paneron-registry-kit/views/itemPathUtils': (await import('@riboseinc/paneron-registry-kit/views/itemPathUtils.js')).default,
  };
}

/**
 * Uses importMapper to make select dependencies available within code
 * that was dynamically `import()`ed from an object URL
 * (see `plugins.renderer.getPlugin()` for where that happens).
 */
async function setUpDeps() {
  const deps = await getDeps();

  const imports: Record<string, string> = {};
  for (const [moduleID, moduleData] of Object.entries(deps)) {
    const m = moduleData as any;
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

(async function f () {
  const deps = await setUpDeps();

  //const plugin = (await import('#ext')).default;
  const code = await (await fetch('./extension.js')).text();
  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const { 'default': maybePluginPromise } = await import(/* webpackIgnore: true */ url);

  const plugin = await maybePluginPromise;

  console.debug("got a plugin", plugin, plugin.mainView);

  const View = plugin.mainView;

  const data = await (await fetch('./data.json')).json();

  console.debug("got some data", data);

  const usePersistentStateReducer: any = (await import('@riboseinc/paneron-extension-kit/usePersistentStateReducer.js')).default.default

  console.debug(usePersistentStateReducer);

  setTimeout(() => ReactDOM.render(
    <View
      useGlobalSettings={() => ({ value: {
        settings: { mainNavbarPosition: 'top', sidebarPosition: 'left', defaultTheme: 'light' }
      } })}
      usePersistentDatasetStateReducer={
        function usePersistentDatasetStateReducer
        (...opts: any[]) {
          const effectiveOpts = React.useMemo((() => [
            // opts[0] is the storage key in the list of positional parameters.
            // Extension code should specify locally scoped key,
            // and this takes care of additionally scoping it by repository and dataset.
            opts[0],

            opts[1], opts[2],

            opts[3], opts[4], opts[5],
          ]), [...[...Array(6).keys()].map(k => opts[k])]);
          return usePersistentStateReducer(() => {}, () => ({}), ...effectiveOpts);
        }
      }
    />,
    container), 2000);
})();
