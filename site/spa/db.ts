/** Wraps IndexedDB. */

import { Effect } from 'effect';
import * as S from '@effect/schema/Schema';


let db: Promise<IDBDatabase> | null = null;
let dbVersion: number | null = null;


// API
// ===

export const getDB = (
  dbName: string,
  version: number,
  stores: Readonly<Record<string, IDBObjectStoreParameters>>,
  /** Force recreate (delete DB first). */
  recreate?: boolean,
) =>
  Effect.tryPromise((): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      function createDB() {
        console.debug("Creating indexed DB", dbName);
        _getDB(dbName, version, stores).then(resolve, reject);
      };
      if (recreate) {
        console.debug("Deleting indexed DB", dbName);
        const req = indexedDB.deleteDatabase(dbName);
        req.onerror = reject;
        req.onsuccess = () => _getDB(dbName, version, stores).then(resolve, reject);
      } else {
        createDB();
      }
    });
  });


export function getItem<T>(
  db: IDBDatabase,
  storeName: string,
  key: IDBValidKey,
  schema: S.Schema<T>,
) {
  return Effect.gen(function * (_) {
    const obj = yield * _(Effect.tryPromise(() => _getItem(db, storeName, key)));
    return yield * _(S.parse(schema)(obj));
  });
}

export function storeItem<T>(
  db: IDBDatabase,
  storeName: string,
  item: T,
) {
  return Effect.tryPromise(async () => {
    await _storeItem(db, storeName, item);
    return item;
  })
}


// Internals
// =========

function _getItem(
  db: IDBDatabase,
  storeName: string,
  key: IDBValidKey,
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    try {
      const store = getStore(db, storeName, false);
      const req = store.get(key);
      req.onerror = function (evt) { reject(getErrorCode(evt)); };
      req.onsuccess = () => resolve(req.result);
    } catch (e) {
      reject(e);
    }
  });
}

function _storeItem(
  db: IDBDatabase,
  storeName: string,
  val: unknown,
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const store = getStore(db, storeName, true);
      const req = store.add(val);
      req.onerror = function (evt) { reject(getErrorCode(evt)); };
      req.onsuccess = () => resolve();
    } catch (e) {
      reject(e);
    }
  });
}


function getErrorCode (evt: Event): string | undefined {
  return (evt.target as { errorCode?: string }).errorCode;
}


function createStore(
  db: IDBDatabase,
  name: string,
  param: IDBObjectStoreParameters,
): Promise<IDBObjectStore> {
  return new Promise((resolve, reject) => {
    try {
      db.deleteObjectStore(name);
    } catch (e) {
      // XXX: Check that the error is a NotFoundError:
      // https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/deleteObjectStore
    }
    const store = db.createObjectStore(name, param);
    store.transaction.oncomplete =
      function () { resolve(store) };
    store.transaction.onerror =
      function (evt) { reject(getErrorCode(evt)) };
  });
}


// XXX: Move to Effect layer/service
function _getDB(
  dbName: string,
  version: number,
  stores: Readonly<Record<string, IDBObjectStoreParameters>>,
): Promise<IDBDatabase> {
  db ??= new Promise((resolve, reject) => {

    if (dbVersion !== null && dbVersion !== version) {
      reject("DB was created with another version");
    }

    const request = indexedDB.open(dbName, version);
    request.onerror = function handleDBOpenError (evt) {
      const errCode = (evt.target as { errorCode?: string })?.errorCode;
      console.error("Failed to get indexedDB", errCode);
      reject(errCode);
    };
    request.onupgradeneeded = function handleDBOUpgrade(evt: IDBVersionChangeEvent & { target: null | { result?: IDBDatabase } }) {
      const db = evt.target?.result;
      if (!db) {
        throw new Error("Unable to obtain IDB handle while handling version update");
      }
      Promise.all(Object.entries(stores).map(([storeName, params]) =>
        createStore(db, storeName, params)
      )).then(() => resolve(db), reject);
    }
    request.onsuccess = function handleDBOpenSuccess(evt) {
      const db = (evt.target as IDBOpenDBRequest).result;
      if (db) {
        resolve(db);
      } else {
        reject("Got undefined when obtaining IndexedDB handle");
      }
      
    };

  });

  return db;
}

function getStore(db: IDBDatabase, storeName: string, write = false) {
  return db.
      transaction(storeName, write ? 'readwrite' : 'readonly').
      objectStore(storeName);
};