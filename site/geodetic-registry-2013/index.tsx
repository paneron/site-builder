import React from 'react';
import ReactDOM from 'react-dom/client';

import { Effect } from 'effect';
import * as BrowserHttp from '@effect/platform-browser/HttpClient';

import { NonIdealState, Spinner } from '@blueprintjs/core';

//import './normalize.css';
//import 'jsondiffpatch/dist/formatters-styles/annotated.css';
//import 'jsondiffpatch/dist/formatters-styles/html.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import 'react-resizable/css/styles.css';
import './base.css';
import './site.css';

import ErrorBoundary from '@riboseinc/paneron-extension-kit/widgets/ErrorBoundary.js';
import type { RendererPlugin, DatasetContext } from '@riboseinc/paneron-extension-kit/types/index.js';

import { repeatWhileLoading, loadExtensionAndDataset } from './extension-loader.js';
import { getExtensionContext } from './extension-context.js';


console.debug("Hello World");

const container = ReactDOM.createRoot(document.getElementById('app')!);


// Render loader

const byteFormatter = Intl.NumberFormat(navigator.language, {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});

repeatWhileLoading(function renderLoader(done, total) {
  container.render(
    <Loader done={done} total={total} />,
  );
});

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


// Load app

loadApp().
  catch(e => {
    console.error(e);
    container.render(
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
    );
  });

async function loadApp () {
  const [plugin, data] = await (loadExtensionAndDataset().pipe(
    Effect.provide(BrowserHttp.client.layer),
    Effect.runPromise,
  ));

  console.debug("Got plugin and data", plugin, data);

  const ctx = getExtensionContext(data);

  container.render(
    <App View={plugin.mainView!} ctx={ctx} />,
  );

  // Clean up loader CSS
  document.getElementById('loaderCSS')?.remove();
}

const App: React.FC<any> = ({ View, ctx }: {
  View: NonNullable<RendererPlugin["mainView"]>,
  ctx: DatasetContext,
}) => {
  return (
    <React.StrictMode>
      <ErrorBoundary viewName="main dataset view">
        <View {...ctx} />
      </ErrorBoundary>
    </React.StrictMode>
  );
};
