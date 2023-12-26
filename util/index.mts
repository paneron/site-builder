import { join, extname, resolve } from 'node:path';
import { parse as parseURL, fileURLToPath } from 'node:url'
import { readFile, watch } from 'node:fs/promises';
import { createServer } from 'node:http';
import { fstatSync } from 'node:fs';

import { Options } from '@effect/cli';
import * as S from '@effect/schema/Schema';


/** @deprecated */
export function noop (..._: any[]) { void 0; }


export const LogLevelSchema = S.literal('debug', 'info', 'error', 'silent');
export type LogLevel = S.Schema.To<typeof LogLevelSchema>

export const BaseBuildConfigSchema = S.struct({
  logLevel: LogLevelSchema,
});
export interface BaseBuildOptions extends S.Schema.To<typeof BaseBuildConfigSchema> {}

export const BaseBuildCLIArgSchema = S.struct({
  debug: S.union(S.boolean, S.undefined),
  verbose: S.union(S.boolean, S.undefined),
});

export const outputOptions = {
  verbose: Options.boolean("verbose").pipe(Options.withAlias("v")),
  debug: Options.boolean("debug"),
} as const;

export const BaseBuildConfigFromCLIArgs: S.Schema<
  S.Schema.To<typeof BaseBuildCLIArgSchema>,
  S.Schema.To<typeof BaseBuildConfigSchema>> =
S.transform(
  BaseBuildCLIArgSchema,
  BaseBuildConfigSchema,
  (values) => ({ logLevel: values.debug
    ? 'debug'
    : values.verbose
      ? 'info'
      : 'error'
  } as const),
  // We don’t want to support reverse transformation but we have to per typings.
  // XXX: this does the wrong thing
  ({ logLevel }) => ({ debug: logLevel === 'debug', verbose: logLevel === 'info' }),
  //() => ParseResult.fail(ParseResult.ParseIssue),
)

export interface BaseBuildOptions extends S.Schema.To<typeof BaseBuildConfigSchema> {}


/**
 * Returns true if we are in CLI mode,
 * either via pipe or normal invocation as `node build.js`.
 *
 * XXX: flawed? Check on Node 20.
 *
 * @deprecated use @effect/cli instead.
 */
export function isCLI(): boolean {
  console.debug("utils import.meta.url", import.meta.url);
  console.debug((import.meta as any).parent);
  if (import.meta.url) {
    // Simple case is if we have this set
    const pathToThisFile = resolve(fileURLToPath(import.meta.url));
    const pathPassedToNode = process.argv[1]
      ? resolve(process.argv[1])
      : undefined;
    //console.debug(process.argv, pathPassedToNode, pathToThisFile);
    return (pathPassedToNode
      ? pathToThisFile.includes(pathPassedToNode)
      : false);
  } else {
    // Check if Node is reading from stdin
    // (e.g., `esbuild build.ts | node --input-type=module -`)
    // by checking if there’s inbound or outbound pipe
    // (inbound pipe should be enough but doesn’t always work,
    // maybe that’s an issue with running Node as `yarn node`
    // which we need to do to have environment set up)
    const pipeIn = fstatSync(0);
    const pipeOut = fstatSync(1);
    return pipeIn.isFIFO() || pipeOut.isFIFO();
  }
}


/**
 * A helper to avoid given async function executing in parallel.
 *
 * @deprecated use effect instead.
 */
export function makeSequential
<T, A extends unknown[]>
(fn: (...args: A) => Promise<T>): (...args: A) => Promise<T> {
  let workQueue: Promise<void> = Promise.resolve();
  return (...args) => {
    function sequential() { return fn(...args); };
    const result = workQueue.then(sequential, sequential);
    workQueue = result.then(noop, noop);
    return result;
  };
}


/** @deprecated use util/watch2 instead (to be refactored). */
export async function watchAndCall(
  root: string,

  /** Subdirectories, relative to current path, to watch recursively. */
  subdirs: string[],

  /** Subdirectories to ignore, relative to current path. */
  ignoredirs: string[],

  /** Function to execute on changes. */
  cb: () => void,

  signal: AbortSignal,
) {
  let debounceTimeout: NodeJS.Timeout | number | null = null;

  function cancel() {
    if (debounceTimeout) {
      console.debug("watch: cancelling scheduled callback");
      clearTimeout(debounceTimeout);
    }
  }

  // Subdirectories to watch as fully-qualified paths
  const fqdirs = subdirs.map(d => resolve(d));
  const fqignoredirs = ignoredirs.map(d => resolve(d));

  console.debug(
    "Watching", resolve(root),
    "for changes in subdirectories", fqdirs.join(', '));
  if (fqignoredirs) {
    console.debug("ignoring", fqignoredirs.join(', '));
  }

  const watcher = watch(root, { recursive: true, signal });
  try {
    for await (const evt of watcher) {
      console.debug(`watch: event: ${evt.filename}`);

      const fqfn = evt.filename ? resolve(root, evt.filename) : undefined;

      if (fqfn) {
        const watched = fqdirs.find(fqd => fqfn.startsWith(fqd));
        const ignored = fqignoredirs.find(fqd => fqfn.startsWith(fqd));
        console.debug(`watch: ${fqfn} is ${!watched ? 'not ' : ''}watched by ${fqdirs.join(', ')}, ${!ignored ? 'not ' : ''}ignored`);
        if (watched && !ignored) {
          console.log(`watch: file changed: ${evt.filename}`);
          cancel();
          debounceTimeout = setTimeout(cb, 1000);
        } else if (evt.filename) {
          console.debug(`watch: ignoring file change: ${evt.filename}`);
        }
      } else {
        console.debug(`watch: ignoring event (cannot resolve filename): ${evt.filename}`);
        continue;
      }
    }
  } catch (e) {
    if ((e as any).name === 'AbortError') {
      console.debug("watch: stopping watcher...");
      cancel();
      return;
    }
    throw e;
  }

  cancel();
}


export function serve(
  root: string,
  port: number,
  signal?: AbortSignal,
) {
  console.log(`serve: starting server at port ${port}...`);

  const ctypes = new Map([
    ['.html', 'text/html'],
    ['.js', 'text/javascript'],
    ['.css', 'text/css'],
    ['.json', 'application/json'],
    ['.jsonld', 'application/ld+json'],
  ]);

  const server = createServer(async function handleRequest(req, resp) {
    if (!req.url) { return; }
    const requestedPath = parseURL(req.url).pathname ?? '/';
    const filename = !requestedPath || requestedPath.endsWith('/')
      ? 'index.html'
      : requestedPath;
    const ctype = ctypes.get(extname(filename)) ?? 'application/octet-stream';
    console.info(`serve: serving ${filename} as ${ctype}...`);
    try {
      const blob = await readFile(join(root, filename));
      resp.writeHead(200, {'Content-Type': ctype});
      resp.write(blob, 'binary');
      resp.end();
    } catch (e) {
      console.error("Failed to handle response", req.url, e);
      resp.writeHead(500);
      resp.end();
    }
  });

  signal?.addEventListener('abort', function abortServe() {
    console.debug("serve: stopping server...");
    server.closeAllConnections?.();
    return new Promise((resolve, reject) =>
      server.close((err) => err ? reject(err) : resolve(void 0)));
  });

  server.setTimeout(500);
  server.listen(port);

  console.info(`serve: listening at port ${port}`);

  return server;
}
