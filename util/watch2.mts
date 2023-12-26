import { resolve } from 'node:path';
import { watch } from 'node:fs/promises';

import { Stream } from 'effect';


const watcherStream = (directory: string) =>
  Stream.
    fromAsyncIterable(
      watch(directory, { recursive: true }),
      (e) => new Error(String(e))
    ).
    pipe(
      // Omit events without a filename
      Stream.filter(evt => !!evt.filename),
      // Convert events to fully qualified filenames
      Stream.map(evt => resolve(directory, evt.filename!)),
    )

const filteredWatcherStream = (directory: string, ignorePrefixes: string[]) => {
  const fqIgnorePrefixes = ignorePrefixes.map(pref => resolve(pref))
  return (
    watcherStream(directory).
    pipe(
      Stream.filter(path => !fqIgnorePrefixes.find(fqip => path.startsWith(fqip))),
    ));
}

export const debouncedWatcher = (directory: string, ignorePrefixes: string[], debounce: number) =>
  filteredWatcherStream(directory, ignorePrefixes).
    pipe(
      Stream.debounce(`${debounce} millis`),
    )
