import React from 'react';

import usePersistentStateReducer from '@riboseinc/paneron-extension-kit/usePersistentStateReducer.js';
import type { PersistentStateReducerHook } from '@riboseinc/paneron-extension-kit/usePersistentStateReducer.js';
import type { DatasetContext } from '@riboseinc/paneron-extension-kit/types/index.js';


export function getExtensionContext(
  data: Record<string, Record<string, unknown>>,
): DatasetContext {

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

      // XXX
      const alwaysLoadInitialState = React.useCallback((async () => opts[4]), [opts[4]]);

      return usePersistentStateReducer(noOp, alwaysLoadInitialState, ...effectiveOpts);
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
        value: {},
          //Object.keys(chains).
          //  map((cid) => ({ [cid]: {} })).
          //  reduce((prev, curr) => ({ ...prev, ...curr }), {}),
      };
    },

    useFilteredIndex: function ({ queryExpression, keyExpression }) {
      return {
        ...VALUE_HOOK_STUB,
        value: { indexID: queryExpression },
      };
    },

    useIndexDescription: function ({ indexID }) {
      return {
        ...VALUE_HOOK_STUB,
        value: { status: { objectCount: 0 } },
      };
    },
  };

  return ctx;
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


function noOp() {};
