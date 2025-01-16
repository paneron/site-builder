import process from 'node:process';
import { join, extname, resolve, relative } from 'node:path';
import { parse as parseURL, fileURLToPath } from 'node:url'
import { readFile, watch } from 'node:fs/promises';
import { createServer } from 'node:http';
import { fstatSync } from 'node:fs';

import { pipe, Effect, type Types, Option, LogLevel as EffectLogLevel } from 'effect';
import { FileSystem } from '@effect/platform';
import type { PlatformError } from '@effect/platform/Error';
import type { Command } from '@effect/cli/Command';
import { Options } from '@effect/cli';
import * as S from '@effect/schema/Schema';
import type { Command as Command_ } from '@effect/cli/Command';

import { CONTRIB_SITE_TEMPLATES, ContribSiteTemplateName } from '../site/index.mjs';


/** @deprecated */
export function noop (..._: any[]) { void 0; }


export function unpackOption(opt: Option.Option<string>, df?: undefined): string | undefined {
  return Option.isNone(opt) ? df : opt.value;
}


export type SiteBuilder = (
  opts: SiteBuildOptions & {
    /** Where to put built static site assets. */
    outdir: string;
    /** Any extra JS entry points to be loaded */
    injectedEntries: string[];
    /** Any extra asset files in the given dir to be loaded */
    injectedAssetsDir?: string;
    /** Additional public (i.e. to be served) path prefix for assets listed under injectedAssetsDir */
    injectedAssetsPrefix?: string;
    /** Path to the package on filesystem. */
    packageRoot: string;
  },
) => Effect.Effect<void, PlatformError, FileSystem.FileSystem>


// Reporting options
// =================

export const LogLevelSchema = S.Literal('debug', 'info', 'error', 'silent');
export type LogLevel = S.Schema.Type<typeof LogLevelSchema>

export const EFFECT_LOG_LEVELS: { [key in LogLevel]: EffectLogLevel.LogLevel } = {
  'debug': EffectLogLevel.Debug,
  'info': EffectLogLevel.Info,
  'error': EffectLogLevel.Error,
  'silent': EffectLogLevel.None,
} as const;

export const ReportingConfigSchema = S.Struct({
  logLevel: LogLevelSchema,
});
export interface ReportingOptions extends S.Schema.Type<typeof ReportingConfigSchema> {}

export const reportingOptions = {
  verbose: Options.boolean("verbose").pipe(Options.withAlias("v")),
  debug: Options.boolean("debug"),
} as const;

export function parseReportingConfig(
  values: Types.Simplify<Command.ParseConfig<typeof reportingOptions>>,
) {
  return S.decodeUnknownSync(ReportingConfigSchema)({
    logLevel: values.debug
      ? 'debug'
      : values.verbose
        ? 'info'
        : 'error'
  });
}

// const ReportingCLIArgSchema = S.struct({
//   debug: S.union(S.boolean, S.undefined),
//   verbose: S.union(S.boolean, S.undefined),
// });
// export const ReportingConfigFromCLIArgs: S.Schema<
//   S.Schema.Type<typeof ReportingCLIArgSchema>,
//   S.Schema.Type<typeof ReportingConfigSchema>> =
// S.transform(
//   ReportingCLIArgSchema,
//   ReportingConfigSchema,
//   (values) => ({
//     logLevel: values.debug
//       ? 'debug'
//       : values.verbose
//         ? 'info'
//         : 'error'
//   } as const),
//   // We don’t want to support reverse transformation but we have to per typings.
//   // XXX: this does the wrong thing
//   ({ logLevel }) => ({ debug: logLevel === 'debug', verbose: logLevel === 'info' }),
//   //() => ParseResult.fail(ParseResult.ParseIssue),
// );


// Dataset build options
// =====================

export const DatasetBuildConfigSchema = S.Struct({
  datadir: S.String.pipe(S.nonEmpty()),
});
export interface DatasetBuildOptions extends S.Schema.Type<typeof DatasetBuildConfigSchema> {}

export const datasetBuildOptions = {
  datadir: Options.directory('datadir', { exists: 'yes' }).pipe(
    Options.optional),
} as const;

export function parseDatasetBuildOptions(
  { datadir }: Types.Simplify<Command.ParseConfig<typeof datasetBuildOptions>>,
) {
  return S.decodeUnknownSync(DatasetBuildConfigSchema)({
    datadir: Option.isNone(datadir) ? process.cwd() : datadir.value,
  });
}


// Site build options
// ==================
export const injectedResourcesOptions = {
  injectedEntries: Options.file('injected-entries').pipe(Options.repeated).pipe(Options.withAlias('i')),
  injectedAssetsDir: Options.directory('injected-assets-dir').pipe(Options.optional),
  injectedAssetsPrefix: Options.text('injected-assets-prefix').pipe(Options.optional),
};

export function parseInjectedResourcesConfig(
  values: Types.Simplify<Command.ParseConfig<typeof injectedResourcesOptions>>,
) {

  return S.decodeUnknownSync(InjectedResourcesSchema)({
    injectedEntries: values.injectedEntries ?? [],
    injectedAssetsDir: unpackOption(values.injectedAssetsDir),
    injectedAssetsPrefix: unpackOption(values.injectedAssetsPrefix),
  });
}

export const InjectedResourcesSchema = S.Struct({
  injectedEntries: S.Array(S.String.pipe(S.nonEmpty())),
  injectedAssetsDir: S.optional(S.String.pipe(S.nonEmpty())),
  injectedAssetsPrefix: S.optional(S.String.pipe(S.nonEmpty())),
});

export interface InjectedResourcesOptions extends S.Schema.Type<typeof InjectedResourcesSchema> {}

export const siteBuildOptions = {
  outdir: Options.directory('outdir'),
  forUsername: Options.text('forusername').pipe(Options.optional),
  // TODO: instead of passing --dataversion, calculate it based on datadir state?
  dataVersion: Options.text('dataversion').pipe(Options.optional),

  devModeExtensionDirectory: Options.text('devextpath').pipe(Options.optional),

  siteTemplateName: Options.choice('template', CONTRIB_SITE_TEMPLATES).pipe(
    Options.withDefault(CONTRIB_SITE_TEMPLATES[0])),

  ...injectedResourcesOptions,
  ...reportingOptions,
  ...datasetBuildOptions,
} as const;

export const SiteBuildConfigSchema = S.Struct({
  outdir: S.String.pipe(S.nonEmpty()),
  dataVersion: S.optional(S.String.pipe(S.nonEmpty())),
  forUsername: S.optional(S.String.pipe(S.nonEmpty())),
  siteTemplatePath: S.String.pipe(S.nonEmpty()),

  devModeExtensionDirectory: S.optional(S.String.pipe(S.nonEmpty())),
}).pipe(
  S.extend(InjectedResourcesSchema),
  S.extend(ReportingConfigSchema),
  S.extend(DatasetBuildConfigSchema),
);

export interface SiteBuildOptions extends S.Schema.Type<typeof SiteBuildConfigSchema> {}

export function parseSiteBuildConfig(
  rawOpts: Types.Simplify<Command_.ParseConfig<typeof siteBuildOptions>>,
  packageRoot: string,
) {

  const {
    outdir,
    injectedEntries,
    injectedAssetsDir,
    injectedAssetsPrefix,
    siteTemplateName,
    datadir,
    devModeExtensionDirectory,
    forUsername,
    dataVersion,
    ...baseOpts } = rawOpts;
  return S.decodeUnknownSync(SiteBuildConfigSchema)({
    outdir,
    siteTemplatePath: getPathToSiteTemplateDist(siteTemplateName, packageRoot),
    forUsername: unpackOption(forUsername),
    devModeExtensionDirectory: unpackOption(devModeExtensionDirectory),
    dataVersion: unpackOption(dataVersion),
    ...parseInjectedResourcesConfig({
      injectedEntries,
      injectedAssetsDir,
      injectedAssetsPrefix,
    }),
    ...parseDatasetBuildOptions({ datadir }),
    ...parseReportingConfig(baseOpts),
  });
}

/** Returns absolute path to given contrib site template’s dist directory. */
function getPathToSiteTemplateDist(
  templateName: S.Schema.Type<typeof ContribSiteTemplateName>,
  packageRoot: string,
) {
  return join(packageRoot, 'site', templateName, 'dist');
}


// Misc.
// =====

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
  { signal, onDebug, onError, onWarning }: {
    signal?: AbortSignal,
    onDebug?: (msg: string) => void,
    onError?: (msg: string) => void,
    onWarning?: (msg: string) => void,
  },
) {
  onDebug?.(`serve: starting server at port ${port}...`);

  const ctypes = new Map([
    ['.html', 'text/html'],
    ['.js', 'text/javascript'],
    ['.mjs', 'text/javascript'],
    ['.css', 'text/css'],
    ['.json', 'application/json'],
    ['.jsonld', 'application/ld+json'],
    ['.svg', 'image/svg+xml'],
    ['.gif', 'image/gif'],
    ['.jpeg', 'image/jpeg'],
    ['.jpg', 'image/jpeg'],
    ['.png', 'image/png'],
    ['.ico', 'image/vnd.microsoft.icon'],
    ['.otf', 'font/otf'],
    ['.ttf', 'font/ttf'],
    ['.woff', 'font/woff'],
    ['.woff2', 'font/woff2'],
    ['.eot', 'application/vnd.ms-fontobject'],
  ]);

  const server = createServer(async function handleRequest(req, resp) {
    if (!req.url) { return; }
    const requestedPath = parseURL(req.url).pathname ?? '/';
    const filename = !requestedPath || requestedPath.endsWith('/')
      ? 'index.html'
      : requestedPath;
    const ctype = ctypes.get(extname(filename)) ?? 'application/octet-stream';
    onDebug?.(`serve: got request for ${filename} (assuming ${ctype})...`);
    const urlDecodedFilename = decodeURI(filename);
    try {
      const blob = await readFile(join(root, urlDecodedFilename));
      resp.writeHead(200, {'Content-Type': ctype, 'Content-Length': blob.length});
      resp.write(blob, 'binary');
      onDebug?.(`serve: returning ${join(root, urlDecodedFilename)} as ${ctype}`);
    } catch (e) {
      const err = String(e);
      if (err.indexOf('ENOENT')) {
        onError?.(`serve: ${req.url}: ${join(root, urlDecodedFilename)} does not exist: ${err}`);
        resp.writeHead(404);
      } else {
        onError?.(`serve: failed to handle request of ${req.url}: ${err}`);
        resp.writeHead(500);
      }
    } finally {
      resp.end();
    }
  });

  const abortServe = (reason?: string) => () => {
    onWarning?.(`serve: ${typeof reason === 'undefined' ? '' : `${reason}.  `}Stopping server...`);
    server.closeAllConnections?.();
    return new Promise((resolve, reject) =>
      server.close((err) => err ? reject(err) : resolve(void 0)));
  };

  // 130 is the exit code for SIGINT.  Keeping it alive.
  process.on('SIGINT', () => {
    console.warn(); // Print a new line
    abortServe("Caught interrupt signal")().then(() => process.exit(130));
  });

  signal?.addEventListener('abort', abortServe("ABORT signal received"));

  server.setTimeout(500);
  server.listen(port);

  onDebug?.(`serve: listening at port ${port}`);

  return server;
}


export const readdirRecursive = (
  /** Directory to list. */
  dir: string,
  /**
   * Directory to output paths relative to.
   * (Don’t specify, used for recursion.)
   */
  relativeTo?: string,
):
Effect.Effect<readonly string[], PlatformError, FileSystem.FileSystem> =>
Effect.gen(function * (_) {
  const fs = yield * _(FileSystem.FileSystem);

  const dirEntries = yield * _(
    fs.readDirectory(dir),
    Effect.map(basenames => basenames.map(name => join(dir, name))),
  );

  const dirEntryStats: Record<string, FileSystem.File.Info> = yield * _(
    Effect.reduceEffect(
      dirEntries.map(path => pipe(
        fs.stat(path),
        Effect.map(stat => ({ [path]: stat })),
      )),
      Effect.succeed({}),
      (accum, item) => ({ ...accum, ...item }),
      { concurrency: 10 },
    ),
  );

  const recursiveListings = dirEntries.map(path =>
    dirEntryStats[path]?.type === 'Directory'
      ? readdirRecursive(path, relativeTo ?? dir)
      : Effect.succeed([relative(relativeTo ?? dir, path)])
    );

  const entries = yield * _(
    Effect.all(recursiveListings, { concurrency: 10 }),
    Effect.map(resultLists => resultLists.flat()),
  );

  return entries;
});
