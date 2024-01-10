import * as S from '@effect/schema/Schema';

import React from 'react';

import usePersistentStateReducer from '@riboseinc/paneron-extension-kit/usePersistentStateReducer.js';
import type { PersistentStateReducerHook } from '@riboseinc/paneron-extension-kit/usePersistentStateReducer.js';
import type { Hooks, DatasetContext } from '@riboseinc/paneron-extension-kit/types/index.js';

import type { Dataset } from './dataset';


const GLOBAL_SETTINGS = {
  mainNavbarPosition: 'top',
  sidebarPosition: 'left',
  defaultTheme: 'light',
} as const;


export function getExtensionContext(data: Dataset): DatasetContext {

  const ctx: DatasetContext = {
    title: "Paneron dataset",
    logger: console,

    openExternalLink: async ({ uri }) => { window.open(uri, '_blank') },

    useGlobalSettings: function () {
      return {
        ...VALUE_HOOK_STUB,
        value: { settings: GLOBAL_SETTINGS, },
      } as const;
    },

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

    useObjectData: makeValueHook(function ({ objectPaths, nounLabel }) {
      return { data: getObjectData(data, objectPaths) };
    }),

    getObjectData: async function ({ objectPaths }) {
      return { data: getObjectData(data, objectPaths) };
    },

    useRemoteUsername: function () {
      // Always unset, since web GUI is not meant to be editable for now.
      return { ...VALUE_HOOK_STUB, value: {} };
    },

    useSettings: makeValueHook(function () {
      // XXX: Implement useSettings with some local storage
      return { settings: {} };
    }),

    useMapReducedData: makeValueHook(function ({ chains }) {
      return mapReduceChains(data, chains) as any;
    }),

    getMapReducedData: async function  ({ chains }) {
      return mapReduceChains(data, chains) as any;
    },

    useFilteredIndex: makeValueHook(function ({ queryExpression, keyExpression }) {
      return { indexID: getSimpleQueryKey(queryExpression, keyExpression) };
    }),

    useIndexDescription: makeValueHook(function ({ indexID }) {
      return {
        status: {
          objectCount: indexID
            ? listPathsCached(data, indexID).length
            : 0,
        },
      };
    }),

    useObjectPathFromFilteredIndex: makeValueHook(function ({ indexID, position }) {
      return { objectPath: listPathsCached(data, indexID)[position] ?? '' };
    }),

    getObjectPathFromFilteredIndex: async function ({ indexID, position }) {
      return { objectPath: listPathsCached(data, indexID)[position] ?? '' };
    },

    useFilteredIndexPosition: makeValueHook(function ({ indexID, objectPath }) {
      const pos = listPathsCached(data, indexID).indexOf(objectPath);
      return { position: pos >= 0 ? pos : null };
    }),

    getFilteredIndexPosition: async function ({ indexID, objectPath }) {
      const pos = listPathsCached(data, indexID).indexOf(objectPath);
      return { position: pos >= 0 ? pos : null };
    },
  };

  return ctx;
}


// Simple queries
// ==============

/** Returns a list of paths matching a serialized simple query. */
function listPathsCached(
  d: Dataset,
  query: string,
): string[] {
  if (!CACHE[query]) {
    const runnableQuery = getRunnableSimpleQuery(query);
    CACHE[query] = {
      objPaths: listPathsMatchingSimpleQuery(d, runnableQuery)
    };
  }
  return CACHE[query]!.objPaths;
}
const CACHE: Record<string, { objPaths: string[] }> = {};


/** Given a query, returns an ordered list of object paths. */
function listPathsMatchingSimpleQuery(
  d: Dataset,
  query: RunnableSimpleQuery,
): string[] {

  const { predicateFunc: predicate, keyerFunc: keyer } = query;

  const keyed: Record<string, string> = {};
  if (keyer) {
    for (const [objPath, objData] of Object.entries(d)) {
      try {
        keyed[keyer(objData)] = objPath;
      } catch (e) {
        keyed[objPath] = objPath;
      }
    }
  }

  const entries = keyer
    ? Object.keys(keyed).
        sort().
        map(key => [ keyed[key]!, d[keyed[key]!] ]) as [string, Record<string, unknown>][]
    : Object.entries(d);

  const objPaths: string[] = [];
  for (const [objPath, objData] of entries) {
    if (predicate(objPath, objData)) {
      objPaths.push(objPath);
    }
  }

  return objPaths;
}

const SimpleQuery = S.struct({
  predicateString: S.string,
  keyerString: S.optional(S.union(S.string, S.undefined)),
});

interface RunnableSimpleQuery {
  predicateFunc: Predicate;
  keyerFunc?: Keyer;
}

function getSimpleQueryKey(predicateString: string, keyerString?: string): string {
  const query = S.parseSync(SimpleQuery)({ predicateString, keyerString });
  return JSON.stringify(query);
}

function getRunnableSimpleQuery(queryKey: string): RunnableSimpleQuery {
  const query = S.parseSync(SimpleQuery)(JSON.parse(queryKey));

  const keyerFunc = query.keyerString
    ? deserializeKeyer(query.keyerString)
    : undefined;

  return {
    predicateFunc: deserializePredicate(query.predicateString),
    ...(keyerFunc ? { keyerFunc } : {}),
  };
}

function deserializePredicate(predicateString: string): Predicate {
  // XXX: simulated validation
  return new Function('objPath', 'obj', predicateString) as Predicate;
}

function deserializeKeyer(keyExpression: string): Keyer {
  // XXX: simulated validation
  return new Function('obj', keyExpression) as Keyer;
}

type Predicate = (
  /**
   * Also known as “key”
   * (a custom keyer can make it be something other than object path).
   */
  objPath: string,
  /**
   * Object data (value).
   */
  obj: Record<string, unknown>,
) => boolean

/** Allows to index objects by something other than their paths. */
type Keyer = (obj: Record<string, unknown>) => string


// Map-reduce queries
// ==================

function mapReduceChains(data: Dataset, chains: Hooks.Data.MapReduceChains) {
  return Object.entries(chains).
  map(([cID, c]) => {

    const mapped: Record<string, unknown> = {}
    function handleEmit(objPath: string, val: unknown) {
      mapped[objPath] = val;
    }
    const mapFunc = getMapFunc(c.mapFunc);
    const objPaths = c.predicateFunc
      ? listPathsCached(data, getSimpleQueryKey(c.predicateFunc))
      : Object.keys(data);
    for (const objPath of objPaths) {
      mapFunc(
        objPath,
        data[objPath],
        (val) => handleEmit(objPath, val))
    }

    let final;
    if (c.reduceFunc) {
      const reduceFunc = getReduceFunc(c.reduceFunc);
      final = Object.values(mapped).reduce(reduceFunc);
    } else {
      final = Object.values(mapped) || [];
    }

    return { [cID]: final };
  }).
  reduce((prev, curr) => ({ ...prev, ...curr }), {});
}

function getMapFunc(mapFunc: string): MapFunc {
  // XXX: simulated validation
  return new Function('key', 'value', 'emit', mapFunc) as MapFunc;
}

function getReduceFunc(reduceFunc: string): ReduceFunc {
  // XXX: simulated validation
  return new Function('accumulator', 'value', reduceFunc) as ReduceFunc;
}

type MapFunc = (
  /** Object path. */
  key: string,
  /** Object data. */
  value: unknown,
  /** Called for matches. */
  emit: (val: unknown) => void,
) => void

type ReduceFunc = (accumulator: unknown, current: unknown) => void


// Fetching specific object data
// =============================

function getObjectData(data: Dataset, objectPaths: string[]):
Record<string, Record<string, unknown> | null> {
  const d= objectPaths.
    map(objPath => ({
      [objPath]:
        (data[objPath] as Record<string, unknown>)
        ?? null,
    })).
    reduce((prev, curr) => ({ ...prev, ...curr }), {});
  return d;
}


// Extension kit helpers
// =====================

function makeValueHook<I extends unknown[], O>(valueGetter: (...args: I) => O):
(...args: I) => (typeof VALUE_HOOK_STUB) & { value: O } {
  return function (...args) {
    const value = valueGetter(...args)
    return { ...VALUE_HOOK_STUB, value };
  }
}

const VALUE_HOOK_STUB = {
  errors: [] as string[],
  isUpdating: false,
  _reqCounter: 0,
  refresh: () => {},
} as const;


// Other utils
// ===========

function noOp() {};
