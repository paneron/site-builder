import * as S from '@effect/schema/Schema';

import React from 'react';

import usePersistentStateReducer from '@riboseinc/paneron-extension-kit/usePersistentStateReducer.js';
import { isObject } from '@riboseinc/paneron-extension-kit/util';
import type { PersistentStateReducerHook } from '@riboseinc/paneron-extension-kit/usePersistentStateReducer.js';
import type { Hooks, DatasetContext } from '@riboseinc/paneron-extension-kit/types/index.js';


type Dataset = Record<string, Record<string, unknown>>;

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

type MapFunc = (
  /** Object path. */
  key: string,
  /** Object data. */
  value: unknown,
  /** Called for matches. */
  emit: (val: unknown) => void,
) => void

type ReduceFunc = (accumulator: unknown, current: unknown) => void


export function getExtensionContext(
  data: Record<string, Record<string, unknown>>,
): DatasetContext {

  const ctx: DatasetContext = {
    title: "Paneron dataset",
    useGlobalSettings,
    logger: console,
    openExternalLink: async ({ uri }) => { window.open(uri, '_blank') },

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
          data: getObjectData(data, objectPaths) as any,
        },
      };
    },

    getObjectData: async function ({ objectPaths }) {
      return {
        data: getObjectData(data, objectPaths) as any,
      }
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
        value: mapReduceChains(data, chains) as any,
      };
    },

    getMapReducedData: async function  ({ chains }) {
      return mapReduceChains(data, chains) as any;
    },

    useFilteredIndex: function ({ queryExpression, keyExpression }) {
      // const predicate = new Function('objPath', 'obj', queryExpression);
      // const keyer = keyExpression
      //   ? new Function('obj', keyExpression)
      //   : undefined;
      return {
        ...VALUE_HOOK_STUB,
        value: { indexID: getIndexID(queryExpression, keyExpression) },
      };
    },

    useIndexDescription: function ({ indexID }) {
      return {
        ...VALUE_HOOK_STUB,
        value: {
          status: {
            objectCount: indexID
              ? matchObjectsWithCache(data, indexID).length
              : 0,
          },
        },
      };
    },

    useObjectPathFromFilteredIndex: function ({ indexID, position }) {
      const objPaths = matchObjectsWithCache(data, indexID)
      const objectPath = objPaths[position] ?? '';
      return {
        ...VALUE_HOOK_STUB,
        value: { objectPath },
      };
    },

    getObjectPathFromFilteredIndex: async function ({ indexID, position }) {
      const objPaths = matchObjectsWithCache(data, indexID)
      return { objectPath: objPaths[position] ?? '' };
    },

    useFilteredIndexPosition: function ({ indexID, objectPath }) {
      const objPaths = matchObjectsWithCache(data, indexID);
      const pos = objPaths.indexOf(objectPath);
      return {
        ...VALUE_HOOK_STUB,
        value: { position: pos >= 0 ? pos : null },
      };
    },

    getFilteredIndexPosition: async function ({ indexID, objectPath }) {
      const objPaths = matchObjectsWithCache(data, indexID);
      const pos = objPaths.indexOf(objectPath);
      return { position: pos >= 0 ? pos : null };
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


function getObjectData(data: Dataset, objectPaths: string[]) {
  const d= objectPaths.
    map(objPath => ({ [objPath]: parseData(data[objPath]) ?? null })).
    reduce((prev, curr) => ({ ...prev, ...curr }), {});
  return d;
}

const parseDate = S.parseSync(S.Date);

function parseData(val: unknown, _seen?: WeakSet<any>) {
  const seen = _seen ?? new WeakSet();

  if (seen.has(val)) {
    return val;
  }

  if (val && isObject(val)) {
    seen.add(val);
    return Object.entries(val as Record<string, unknown>).
      map(([k, v]): Record<string, unknown> => ({ [k]: parseData(v, seen) })).
      reduce((prev, curr) => ({ ...prev, ...curr }), {});
  } else if (val && Array.isArray(val)) {
    return val.map((val): unknown => parseData(val, seen));
  } else if (typeof val === 'string') {
    try {
      const date = parseDate(val);
      if (date.toISOString() === val) {
        return date;
      } else {
        return val;
      }
    } catch (e) {
      return val;
    }
  } else {
    return val;
  }
}

function mapReduceChains(data: Dataset, chains: Hooks.Data.MapReduceChains) {
  return Object.entries(chains).
  map(([cID, c]) => {

    const mapped: Record<string, unknown> = {}
    function handleEmit(objPath: string, val: unknown) {
      mapped[objPath] = val;
    }
    const mapFunc = getMapFunc(c.mapFunc);
    const objPaths = c.predicateFunc
      ? matchObjectsWithCache(data, getIndexID(c.predicateFunc))
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
  reduce((prev, curr) => ({ ...prev, ...curr }), {})
}

function matchObjects(
  d: Dataset,
  predicateString: string,
  keyerString?: string,
): string[] {
  const predicate = getPredicate(predicateString);
  const keyer = keyerString ? getKeyer(keyerString) : undefined;

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

function matchObjectsWithCache(
  d: Dataset,
  query: string,
): string[] {
  if (!INDICES[query]) {
    const { predicateString, keyerString } = unpackQuery(query);
    INDICES[query] = { objPaths: matchObjects(d, predicateString, keyerString) };
  }
  return INDICES[query]!.objPaths;
}


function getPredicate(predicateString: string): Predicate {
  // XXX: simulated validation
  return new Function('objPath', 'obj', predicateString) as Predicate;
}

function getKeyer(keyExpression: string): Keyer {
  // XXX: simulated validation
  return new Function('obj', keyExpression) as Keyer;
}

function getMapFunc(mapFunc: string): MapFunc {
  // XXX: simulated validation
  return new Function('key', 'value', 'emit', mapFunc) as MapFunc;
}

function getReduceFunc(reduceFunc: string): ReduceFunc {
  // XXX: simulated validation
  return new Function('accumulator', 'value', reduceFunc) as ReduceFunc;
}

function getIndexID(predicateString: string, keyerString?: string): string {
  return JSON.stringify({ predicateString, keyerString });
}

const IndexQuery = S.struct({
  predicateString: S.string,
  keyerString: S.union(S.string, S.undefined),
});

function unpackQuery(indexID: string): S.Schema.To<typeof IndexQuery> {
  return JSON.parse(indexID);
}
