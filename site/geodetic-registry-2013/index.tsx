import React from 'react';
import ReactDOM from 'react-dom/client';

import { Effect } from 'effect';
import * as BrowserHttp from '@effect/platform-browser/HttpClient';

import { NonIdealState, Spinner, Button } from '@blueprintjs/core';

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

const byteFormatter = Intl.NumberFormat(navigator.language, {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});


loadApp();

function loadApp (ignoreCache = false) {
  const leaveLoadingState = repeatWhileLoading(function renderLoader(done, total, stage) {
    container.render(
      <Loader
        done={done < total ? done : undefined}
        total={total > done ? total : undefined}
        stage={stage}
      />,
    );
  });

  loadExtensionAndDataset(ignoreCache).
  pipe(
    Effect.provide(BrowserHttp.client.layer),
    Effect.runPromise,
  ).
  then(([plugin, data]) => {
    leaveLoadingState();
    const ctx = getExtensionContext(data);
    container.render(
      <App View={plugin.mainView!} ctx={ctx} />,
    );

  }).
  catch(e => {
    console.error("Failed to load", e);
    leaveLoadingState();
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
          <Button onClick={() => loadApp(true)}>Reload</Button>
        </>}
      />,
    );
  }).
  finally(() => {
    // Clean up loader CSS
    document.getElementById('loaderCSS')?.remove();
  });
}

const App: React.FC<{
  View: NonNullable<RendererPlugin["mainView"]>,
  ctx: DatasetContext,
}> = function ({ View, ctx }) {
  return (
    <React.StrictMode>
      <ErrorBoundary viewName="main dataset view">
        <View {...ctx} />
      </ErrorBoundary>
    </React.StrictMode>
  );
};

function Loader(
  { total, done, stage }:
  { total?: number | undefined, done?: number | undefined, stage: string },
) {
  const value = stage === 'fetching' && done && total && total > 0 && total !== done
    ? done / total
    : undefined;
  return <NonIdealState
    className="loaderWrapper"
    icon={<Spinner
      className="loader"
      {...(value ? { value } : {})}
    />}
    title={stage === 'fetching' ? "Downloading dataset & extension" : "Preparing dataset"}
    description={stage === 'fetching'
      ? `${done ? byteFormatter.format(done) : 'N/A'} of ${total ? byteFormatter.format(total) : 'N/A'}`
      : undefined}
  />;
}
