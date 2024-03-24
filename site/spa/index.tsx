// Client-side JS entry point.
//
// TODO: Move this client-side stuff into a subdir?


import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { Effect } from 'effect';
import * as BrowserHttp from '@effect/platform-browser/HttpClient';
import * as S from '@effect/schema/Schema';

import { PopoverInteractionKind, NonIdealState, Spinner, Button, Tag } from '@blueprintjs/core';
import { Tooltip2 as Tooltip } from '@blueprintjs/popover2';

import MathJax from 'react-mathjax2';

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

import { BasicExtensionMeta, repeatWhileLoading, loadExtensionAndDataset } from './extension-loader.js';
import { getExtensionContext } from './extension-context.js';
import { getDBEffect, getItemEffect, storeItem } from './db.js';


console.debug("Hello World");


const container = ReactDOM.createRoot(document.getElementById('app')!);

const byteFormatter = Intl.NumberFormat(navigator.language, {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});


loadApp(false);

const SettingsSchema = S.union(
  S.undefined, // when blank slate
  S.struct({ key: S.literal('settings'), value: S.record(S.string, S.unknown) }),
);

function loadApp (ignoreCache = true) {
  const leaveLoadingState = repeatWhileLoading(function renderLoader(done, total, stage) {
    container.render(
      <Loader
        done={done < total ? done : undefined}
        total={total > done ? total : undefined}
        stage={stage}
      />,
    );
  });
  
  Effect.all([

    loadExtensionAndDataset(ignoreCache),

    // Get settings DB & settings object
    getDBEffect('settings', 1, {
      settings: { keyPath: 'key' },
    }, true).pipe(
      Effect.flatMap((settingsDB) =>
        getItemEffect(
          settingsDB,
          'settings', // store
          'settings', // key
          SettingsSchema,
        ).pipe(
          Effect.flatMap(result =>
            Effect.succeed(
              [settingsDB, result?.value ?? {}] as [IDBDatabase, Record<string, unknown>]
            )
          ),
        )
      ),
    ),
  ]).
  pipe(
    Effect.provide(BrowserHttp.client.layer),
    Effect.runPromise,
  ).
  then(([[{ extInfo, ext }, dataset], [settingsDB, settings]]) => {
    leaveLoadingState();
    const ctx = getExtensionContext(
      dataset.data,
      {
        username: dataset.manifest?.forUsername ?? undefined,
        getSettings: () => settings,
        updateSetting: async (key, value) => {
          settings[key] = value;
          await storeItem(settingsDB, 'settings', { key: 'settings', value: settings })
        },
      },
    );
    container.render(
      <App View={ext.mainView!} ctx={ctx} extMeta={extInfo} />,
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

import pkg from './package.json';
const spaTemplateVersion = pkg.version ?? 'N/A';
const deps = pkg.dependencies;

const App: React.FC<{
  View: NonNullable<RendererPlugin["mainView"]>,
  extMeta: S.Schema.To<typeof BasicExtensionMeta>,
  ctx: DatasetContext,
}> = function ({ View, extMeta, ctx }) {
  return (
    <React.StrictMode>
      <ErrorBoundary viewName="main dataset view">
        <div className="appWrapper">
          <div className="mainViewWrapper">
            <MathJax.Context options={MATHJAX_OPTS} script={MATHJAX_SCRIPT_PATH}>
              <View {...ctx} />
            </MathJax.Context>
          </div>
          <Tag className="statusBar">
            <Tooltip
                minimal
                placement="top-start"
                interactionKind={PopoverInteractionKind.HOVER}
                content={<>
                  RegistryKit: {deps['@riboseinc/paneron-registry-kit']}
                  <br />
                  ExtensionKit: {deps['@riboseinc/paneron-extension-kit']}
                </>}>
              <span>Paneron Web v{spaTemplateVersion}</span>
            </Tooltip>
            •
            <span>{extMeta.name} v{extMeta.version}</span>
          </Tag>
        </div>
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
    description={stage === 'fetching' && value
      ? `${done ? byteFormatter.format(done) : 'N/A'} of ${total ? byteFormatter.format(total) : 'N/A'}`
      : undefined}
  />;
}


const MATHJAX_SCRIPT_PATH = './mathjax/MathJax.js?config=AM_HTMLorMML';
const MATHJAX_OPTS = {
  asciimath2jax: {
    useMathMLspacing: true,
    delimiters: [["`","`"]],
    preview: "none",
  },
} as const;
