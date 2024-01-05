import React from 'react';

import usePersistentStateReducer from '@riboseinc/paneron-extension-kit/usePersistentStateReducer.js';
import type { PersistentStateReducerHook } from '@riboseinc/paneron-extension-kit/usePersistentStateReducer.js';
import type { DatasetContext } from '@riboseinc/paneron-extension-kit/types/index.js';


type Dataset = Record<string, Record<string, unknown>>;
type Predicate = (objPath: string, obj: Record<string, unknown>) => boolean
type Keyer = (obj: Record<string, unknown>) => string


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
        value: {
          data: objectPaths.
            map(objPath => ({ [objPath]: data[objPath] ?? null })).
            reduce((prev, curr) => ({ ...prev, ...curr }), {}),
        },
      };
    },

    useRemoteUsername: function () {
      // Always unset, since web GUI is not meant to be editable for now.
      return { ...VALUE_HOOK_STUB, value: {} };
    },

    useSettings: function () {
      // Stub
      return { ...VALUE_HOOK_STUB, value: { settings: {} } };
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
      // const predicate = new Function('objPath', 'obj', queryExpression);
      // const keyer = keyExpression
      //   ? new Function('obj', keyExpression)
      //   : undefined;
      return {
        ...VALUE_HOOK_STUB,
        value: { indexID: getIndexID(queryExpression) },
      };
    },

    useIndexDescription: function ({ indexID }) {
      return {
        ...VALUE_HOOK_STUB,
        value: {
          status: {
            objectCount: indexID
              ? matchObjects(
                  data,
                  getPredicateString(indexID),
                ).length
              : 0,
          },
        },
      };
    },

    useObjectPathFromFilteredIndex: function ({ indexID, position }) {
      const objPaths = matchObjects(data, getPredicateString(indexID))
      const objectPath = objPaths[position] ?? '';
      return {
        ...VALUE_HOOK_STUB,
        value: { objectPath },
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



// INDEX UTILS
// ===========


const INDICES: Record<string, { objPaths: string[] }> = {};

function matchObjects(d: Dataset, predicateString: string): string[] {
  const indexID = getIndexID(predicateString);

  if (!INDICES[indexID]) {
    const predicate = getPredicate(predicateString);

    const objPaths: string[] = [];
    for (const [objPath, objData] of Object.entries(d)) {
      console.debug(objPath);
      if (predicate(objPath, objData)) {
        objPaths.push(objPath);
      }
    }

    INDICES[indexID] = { objPaths };
  }

  return INDICES[indexID]!.objPaths;
}


function getPredicateString(indexID: string) {
  return indexID;
}

function getPredicate(predicateString: string): Predicate {
  // XXX: simulated validation
  return new Function('objPath', 'obj', predicateString) as Predicate;
}

function getKeyer(keyExpression: string): Keyer {
  // XXX: simulated validation
  return new Function('obj', keyExpression) as Keyer;
}

function getIndexID(predicateString: string) {
  return predicateString;
}
