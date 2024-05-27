import * as S from '@effect/schema/Schema';

import * as React from 'react';

import usePersistentStateReducer from '@riboseinc/paneron-extension-kit/usePersistentStateReducer.js';
import type { PersistentStateReducerHook } from '@riboseinc/paneron-extension-kit/usePersistentStateReducer.js';
import type { Hooks, DatasetContext } from '@riboseinc/paneron-extension-kit/types/index.js';

import type { Dataset } from './dataset';


const GLOBAL_SETTINGS = {
  mainNavbarPosition: 'top',
  sidebarPosition: 'left',
  defaultTheme: 'light',
} as const;


export function getExtensionContext(
  data: Dataset,
  opts?: {
    username?: string | undefined;
    getSettings?: () => Record<string, unknown>;
    updateSetting?: (key: string, value: unknown) => Promise<void>
    getState?: (key: string) => Promise<unknown>
    storeState?: (key: string, value: unknown) => void
  },
): DatasetContext {

  const ctx: DatasetContext = {
    title: "Paneron dataset",
    logger: console,

    openExternalLink: async ({ uri }) => { window.open(uri, '_blank') },

    performOperation: (action, func) => (...args) => func(...args),

    useGlobalSettings: function () {
      return {
        ...VALUE_HOOK_STUB,
        value: { settings: GLOBAL_SETTINGS, },
      } as const;
    },

    updateSetting: async function ({ key, value }) {
      await opts?.updateSetting?.(key, value);
      return { success: true };
    },

    useSettings: makeValueHook(function () {
      return { settings: opts?.getSettings?.() ?? {} };
    }),

    usePersistentDatasetStateReducer: (...args) => {
      const effectiveOpts:
      Parameters<PersistentStateReducerHook<any, any>> =
      React.useMemo((() => [
        // args[0] is the storage key in the list of positional parameters.
        // Extension code should specify locally scoped key,
        // and this takes care of additionally scoping it by repository and dataset.
        args[0],

        args[1], args[2],

        args[3], args[4], args[5],
      ]), [...[...Array(6).keys()].map(k => args[k])]);

      // XXX
      const alwaysLoadInitialState = React.useCallback((async () => args[4]), [args[4]]);

      return usePersistentStateReducer(
        opts?.storeState ?? noOp,
        opts?.getState ?? alwaysLoadInitialState,
        ...effectiveOpts);
    },

    useObjectData: makeValueHook(function ({ objectPaths, nounLabel }) {
      return { data: getObjectData(data, objectPaths) };
    }),

    getObjectData: async function ({ objectPaths }) {
      return { data: getObjectData(data, objectPaths) };
    },

    useRemoteUsername: function () {
      // Always unset, since web GUI is not meant to be editable for now.
      return React.useMemo(() => ({
        ...VALUE_HOOK_STUB,
        value: opts?.username ? { username: opts.username } : {},
      }), [opts?.username]);
    },

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
    try {
      const runnableQuery = getRunnableSimpleQuery(query);
      CACHE[query] = {
        objPaths: listPathsMatchingSimpleQuery(d, runnableQuery),
      };
    } catch (e) {
      console.error("Failed to create a query—check syntax?", query.replace('\n', ' '), e);
      CACHE[query] = {
        objPaths: [],
      };
    }
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

  const objPaths: string[] = [];
  for (const [key, value] of Object.entries(d)) {
    if (predicate(key, value)) {
      objPaths.push(key);
    }
  }

  const keyed: Record<string, string> = {};
  if (keyer) {
    for (const objPath of objPaths) {
      try {
        keyed[keyer(d[objPath]!)] = objPath;
      } catch (e) {
        keyed[objPath] = objPath;
      }
    }
  }

  return keyer ? Object.keys(keyed).sort().map(key => keyed[key]!) : objPaths;
}

const SimpleQuery = S.Struct({
  predicateString: S.String,
  keyerString: S.optional(S.Union(S.String, S.Undefined)),
});

interface RunnableSimpleQuery {
  predicateFunc: Predicate;
  keyerFunc?: Keyer;
}

function getSimpleQueryKey(predicateString: string, keyerString?: string): string {
  const query = S.decodeUnknownSync(SimpleQuery)({ predicateString, keyerString });
  return JSON.stringify(query);
}

function getRunnableSimpleQuery(queryKey: string): RunnableSimpleQuery {
  const query = S.decodeUnknownSync(SimpleQuery)(JSON.parse(queryKey));

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
  try {
    const func = new Function('objPath', 'obj', predicateString) as Predicate;
    func('', {});
    return func;
  } catch (e) {
    console.error("Failed to deserialize predicate with objPath & obj variables, or predicate is malformed", predicateString);
    return new Function('key', 'value', predicateString) as MapPredicate;
  }
}

//function deserializeMapPredicate(predicateString: string): MapPredicate {
//  // XXX: simulated validation
//  return new Function('key', 'value', predicateString) as MapPredicate;
//}

function deserializeKeyer(keyExpression: string): Keyer {
  // XXX: simulated validation
  return new Function('obj', keyExpression) as Keyer;
}

type Predicate = (
  /**
   * Also known as “key”.
   */
  objPath: string,
  /**
   * Object data (value).
   */
  obj: Record<string, unknown>,
) => boolean

type MapPredicate = (
  /**
   * Also known as object path.
   */
  key: string,
  /**
   * Object data (value).
   */
  value: Record<string, unknown>,
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
    const mappedItems = Object.values(mapped);
    if (mappedItems.length && mappedItems.length > 0) {
      if (c.reduceFunc) {
        const reduceFunc = getReduceFunc(c.reduceFunc);

        // TODO: Provide initialValue, or otherwise work around the issue where
        // reduce() is not invoked when mappedData contains only one element.
        // See example where “callback is not invoked”: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#edge_cases

        final = mappedItems.reduce(reduceFunc);
      } else {
        final = mappedItems || [];
      }
    } else {
      final = {}
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
  const d = objectPaths.
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
    const argMemo = args.sort().map(a => JSON.stringify(a)).join(',');
    //console.debug("value hook args memo", argMemo);
    return React.useMemo(
      () => ({ ...VALUE_HOOK_STUB, value }),
      [argMemo]);
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
