// Client-side JS entry point.
//
// TODO: Move this client-side stuff into a subdir?


import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { Effect } from 'effect';
import * as BrowserHttp from '@effect/platform-browser/BrowserHttpClient';
import * as S from '@effect/schema/Schema';

import { HotkeysProvider, PopoverInteractionKind, NonIdealState, Spinner, Classes, Button } from '@blueprintjs/core';
import { Tooltip2 as Tooltip } from '@blueprintjs/popover2';

import JsonURL from '@jsonurl/jsonurl';
import lz from 'lz-string';

import MathJax from 'react-mathjax2';

//import './normalize.css';
//import 'jsondiffpatch/dist/formatters-styles/annotated.css';
//import 'jsondiffpatch/dist/formatters-styles/html.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import '@blueprintjs/table/lib/css/table.css';
import 'react-resizable/css/styles.css';
import './base.css';
import './site.css';

import ErrorBoundary from '@riboseinc/paneron-extension-kit/widgets/ErrorBoundary.js';
import DL, { DLEntry } from '@riboseinc/paneron-extension-kit/widgets/DL.js';
import type { RendererPlugin, DatasetContext } from '@riboseinc/paneron-extension-kit/types/index.js';
import Navbar, { NavbarButton } from '@riboseinc/paneron-extension-kit/widgets/Navbar2';
import { BP4_RESET_CSS } from '@riboseinc/paneron-extension-kit/util';

import { repeatWhileLoading, loadExtensionAndDataset } from './extension-loader.js';
import { getExtensionContext } from './extension-context.js';
import { getDBEffect, getItemEffect, storeItem } from './db.js';


console.debug("Hello World");


const EMPTY_ARRAY = [];

// FIXME: Not sustainable and can mess up CSP
const style = document.createElement("style");
style.textContent = BP4_RESET_CSS;
document.head.appendChild(style);

const container = ReactDOM.createRoot(document.getElementById('app')!);


const byteFormatter = Intl.NumberFormat(navigator.language, {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});


loadApp(false);

const SettingsSchema = S.Union(
  S.Undefined, // when blank slate
  S.Struct({ key: S.Literal('settings'), value: S.Record(S.String, S.Unknown) }),
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
      state: { keyPath: 'key' },
    }, false).pipe(
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
    Effect.scoped,
    Effect.provide(BrowserHttp.layerXMLHttpRequest),
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
          await storeItem(settingsDB, 'settings', { key: 'settings', value: settings });
        },
        getState: async (key: string) => {
          return getStoredState()[key] ?? undefined;
          //const got = await getItem(settingsDB, 'state', key) as undefined | { value?: unknown };
          ////console.debug("State: get", key, got?.value ?? undefined);
          //return got?.value ?? undefined;
        },
        storeState: (key: string, value: unknown) => {
          setStoredState({ ...getStoredState(), [key]: value });
          //console.debug("State: store", key, value);
          //storeItem(settingsDB, 'state', { key, value });
        }
      },
    );
    const versionBar = (
      <Tooltip
          minimal
          placement="top-end"
          interactionKind={PopoverInteractionKind.HOVER}
          className="versionsTooltipWrapper"
          content={<>
            Using versions:
            <DL>
              <DLEntry term="Paneron Web" definition={formatDepVer(spaTemplateVersion)} />
              <DLEntry term="ExtensionKit" definition={formatDepVer(deps['@riboseinc/paneron-extension-kit'])} />
              <DLEntry term="RegistryKit" definition={formatDepVer(deps['@riboseinc/paneron-registry-kit'])} />
              <DLEntry term={<>Extension {extInfo.name}</>} definition={formatDepVer(extInfo.version)} />
            </DL>
          </>}>
        <NavbarButton
          className="versions"
          disabled
          text={<>
            <span>{extInfo.name} {formatDepVer(extInfo.version)}</span>
            •
            <span>RK {formatDepVer(deps['@riboseinc/paneron-registry-kit'])}</span>
            •
            <span>EK {formatDepVer(deps['@riboseinc/paneron-extension-kit'])}</span>
            •
            <span>PW {formatDepVer(spaTemplateVersion)}</span>
          </>}>
        </NavbarButton>
      </Tooltip>
    );
    container.render(
      <div className="appWrapper">
        <div className="mainViewWrapper">
          <App View={ext.mainView!} ctx={ctx} />
        </div>
        <Navbar
            className={`statusBar ${Classes.ELEVATION_2}`}
            breadcrumbs={EMPTY_ARRAY}>
          {versionBar}
        </Navbar>
      </div>
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

function formatDepVer(rawVersion: string) {
  return !rawVersion.startsWith('file:') ? rawVersion : 'unreleased (file)';
}

const App: React.FC<{
  View: NonNullable<RendererPlugin["mainView"]>,
  ctx: DatasetContext,
}> = function ({ View, ctx }) {
  return (
    <React.StrictMode>
      <ErrorBoundary viewName="main dataset view">
        <HotkeysProvider>
          <MathJax.Context options={MATHJAX_OPTS} script={MATHJAX_SCRIPT_PATH}>
            <View {...ctx} />
          </MathJax.Context>
        </HotkeysProvider>
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


const MATHJAX_SCRIPT_PATH = './mathjax/MathJax.js?config=TeX-MML-AM_CHTML-full';
const MATHJAX_OPTS = {
  asciimath2jax: {
    useMathMLspacing: true,
    delimiters: [["`","`"]],
    preview: "none",
  },
  tex2jax: {
    inlineMath: [['$','$'], ['\\(','\\)']],
    processEscapes: true
  },
} as const;


// State utils

const StoredState = S.Record(S.String, S.Unknown);

/**
 * Retrieves full stored state from location hash,
 * if it can’t be deserialized then state is overwritten to empty.
 */
function getStoredState(): S.Schema.Type<typeof StoredState> {
  const hashData = getHashData();

  if (hashData.state) {
    let stateDeserialized: unknown;
    try {
      stateDeserialized = JsonURL.parse(
        lz.decompressFromEncodedURIComponent(hashData.state),
        { noEmptyComposite: true });
    } catch (e) {
      console.error("State: Failed to decompress or deserialize stored state", e, hashData.state);
      setStoredState({});
      return {};
    }
    try {
      return S.decodeUnknownSync(StoredState)(stateDeserialized);
    } catch (e) {
      console.error("State: Deserialized state did not validate", e, stateDeserialized);
      setStoredState({});
      return {};
    }
  } else {
    return {};
  }
}

function setStoredState(state: S.Schema.Type<typeof StoredState>) {
  let serializedState: string | undefined;
  try {
    serializedState = JsonURL.stringify(
      state,
      { noEmptyComposite: true, ignoreUndefinedObjectMembers: true });
  } catch (e) {
    console.error("State: Failed to serialize state; not storing", e, state);
    return;
  }
  if (serializedState === undefined) {
    console.error("State: Failed to serialize state: obtained undefined; not storing", state);
    return;
  }
  try {
    storeHashData({
      ...getHashData(),
      state: lz.compressToEncodedURIComponent(serializedState),
    });
  } catch (e) {
    console.error("State: Failed to store URI fragment", e, serializedState);
    return;
  }
}


// Hash fragment utils

const HashData = S.Struct({ state: S.Any });

/**
 * Returns deserialized URI fragment data.
 * Doesn’t throw.
 * If URI fragment looks nonsensical, resets it to empty automatically.
 */
function getHashData(): S.Schema.Type<typeof HashData> {
  const hash = window.location.hash.slice(1);
  if (!hash) {
    return { state: undefined };
  }
  try {
    const hashDeserialized = JsonURL.parse(
      hash,
      { noEmptyComposite: true, AQF: true });
    return S.decodeUnknownSync(HashData)(hashDeserialized);
  } catch (e) {
    console.error("Failed to obtain hash data", e);
    window.location.hash = '';
    return { state: undefined };
    
  }
}

function storeHashData(hashData: S.Schema.Type<typeof HashData>) {
  const stringified = JsonURL.stringify(
    hashData,
    { noEmptyComposite: true, AQF: true, ignoreUndefinedObjectMembers: true },
  );
  if (stringified) {
    window.location.hash = stringified;
  } else {
    throw new Error("Unable to obtain URI fragment (obtained undefined)");
  }
}
