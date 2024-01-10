import { Effect, Cause } from 'effect';
import * as S from '@effect/schema/Schema';
import { ParseError } from '@effect/schema/ParseResult';


let db: Promise<IDBDatabase> | null = null;
let dbVersion: number | null = null;


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

function getObject(
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

export function storeObject(
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


// XXX: Move to layer/service
function _getDB(version: number): Promise<IDBDatabase> {
  db ??= new Promise((resolve, reject) => {

    if (dbVersion !== null && dbVersion !== version) {
      reject("DB was created with another version");
    }

    const request = indexedDB.open('cache', version);
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
      Promise.all([
        createStore(db, 'fileCache', { keyPath: 'filePath' }),
        createStore(db, 'misc', { keyPath: 'id' }),
        createStore(db, 'dataset', { keyPath: 'objPath' }),
      ]).then(() => resolve(db), reject);
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

export const getDB = (version: number) => Effect.tryPromise(() => _getDB(version));

function getStore(db: IDBDatabase, storeName: string, write = false) {
  return db.
      transaction(storeName, write ? 'readwrite' : 'readonly').
      objectStore(storeName);
};

export function getItem<T>
(db: IDBDatabase, storeName: string, key: IDBValidKey, schema: S.Schema<T>):
Effect.Effect<never, ParseError | Cause.UnknownException, T> {
  return Effect.gen(function * (_) {
    const obj = yield * _(Effect.tryPromise(() => getObject(db, storeName, key)));
    return yield * _(S.parse(schema)(obj));
  });
}
