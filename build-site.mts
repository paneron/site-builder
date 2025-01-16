#!/usr/bin/env node

/**
 * Handles building a site.
 *
 * Is a `bin` entry point and one of the primary APIs,
 * if not *the* primary API of this entire package.
 *
 * Depends on Node, currently.
 */

import { resolve, join } from 'node:path';

import { parse as parseYAML } from 'yaml';


import { pipe, Runtime, Console, Stream, Effect, Layer, Logger, Option } from 'effect';
import * as S from '@effect/schema/Schema';
import { NodeContext, NodeRuntime } from '@effect/platform-node';
import type { PlatformError } from '@effect/platform/Error';
import { FileSystem } from '@effect/platform';
import { Options, Command } from '@effect/cli';

import {
  type LogLevel as _LogLevel,
  siteBuildOptions,
  parseSiteBuildConfig,
  SiteBuildConfigSchema,
  type SiteBuildOptions,
  serve as simpleServe,
  EFFECT_LOG_LEVELS,
  readdirRecursive,
} from './util/index.mjs';
import { debouncedWatcher } from './util/watch2.mjs';
import {
  getExtensionURLs,
  BasicExtensionMeta,
  RegisterItem,
  RegisterMeta,
  Proposal,
  PaneronDataset,
} from './model.mjs';


/*
 * This package’s actual unpacked source file location,
 * needed when building the site
 * mainly to resolve site templates
 * (see `getPathToSiteTemplateDist()`).
 */
const PACKAGE_ROOT = resolve(join(import.meta.url.split('file://')[1]!, '..'));


/**
 * Prepares the outdir with site template.
 * If outdir already exists, clears it first.
 */
const scaffoldOutdir = ({
  outdir,
  datadir,
  siteTemplatePath,
  devModeExtensionDirectory,
}: S.Schema.Type<typeof SiteBuildConfigSchema>) =>
Effect.gen(function * (_) {
  const fs = yield * _(FileSystem.FileSystem);

  // Make sure outdir is available
  const maybeStat = yield * _(Effect.either(fs.stat(outdir)));
  yield * _(Effect.matchEffect(maybeStat, {
    onSuccess: (stat) => Effect.gen(function * (_) {
      if (stat.type === 'Directory') {
        // If outdir already exists and is a directory, clean it before building.
        yield * _(Console.withTime(`Cleaning ${outdir}`)(
          clearDirectoryContents(outdir)
        ));
      } else {
        // This should not be possible thanks to option typing,
        // but there could be a race
        yield * _(Effect.fail(`‘outdir’ at ${outdir} is not a directory`));
      }
    }),
    // If stat failed, assume directory doesn’t exist (we can create it)
    onFailure: Effect.succeed,
  }));
  yield * _(fs.makeDirectory(outdir, { recursive: true }));

  yield * _(Effect.all([
    scaffoldTemplate(siteTemplatePath, outdir),
    Console.withTime(`Fetch extension JS ${outdir}`)(
      fetchExtension(datadir, outdir, { devModeExtensionDirectory })
    ),
  ], { concurrency: 4 }));
});


const scaffoldTemplate = (siteTemplatePath: string, outdir: string) =>
Effect.gen(function * (_) {
  const fs = yield * _(FileSystem.FileSystem);
  yield * _(
    Console.withTime(`Scaffold site template from ${siteTemplatePath} into ${outdir}`)(
      fs.copy(siteTemplatePath, outdir, { overwrite: true })
    ),
    Effect.orElse(() => Effect.logError("Failed to scaffold template")),
  );
});


const fetchExtension = (
  datadir: string,
  outdir: string,
  opts?: { devModeExtensionDirectory?: string | undefined },
) =>
Effect.gen(function * (_) {
  const fs = yield * _(FileSystem.FileSystem);

  const datasetMetaPath = join(datadir, 'panerondataset.yaml');
  yield * _(fs.access(datasetMetaPath, { readable: true }));
  const data = yield * _(
    fs.readFileString(datasetMetaPath),
    Effect.map(parseYAML),
    Effect.flatMap(f => S.decodeUnknown(PaneronDataset)(f)),
  );

  const devModeExtensionDir = opts?.devModeExtensionDirectory;
  const extensionURLs = getExtensionURLs(data.type.id, devModeExtensionDir);

  const packageJsonOut = join(outdir, 'package.json');
  const esbuiltSourceOut = join(outdir, 'extension.js');

  yield * _(
    Effect.all([
      Console.withTime(`Fetch extension code from ${extensionURLs.esbuiltSource} to ${esbuiltSourceOut}`)(
        pipe(
          fetchMaybeLocal(extensionURLs.esbuiltSource),
          Effect.flatMap(S.decodeUnknown(S.String)),
          Effect.flatMap(source =>
            fs.writeFileString(join(outdir, 'extension.js'), source)),
        )
      ),
      Console.withTime(`Fetch package.json from ${extensionURLs.packageJson} to ${packageJsonOut}`)(
        pipe(
          fetchMaybeLocal(extensionURLs.packageJson),
          Effect.flatMap(S.decodeUnknown(S.String)),
          Effect.flatMap(S.decodeUnknown(S.parseJson(BasicExtensionMeta))),
          Effect.tap(extInfo => Effect.logDebug(`Read extension data: ${JSON.stringify(extInfo)}`)),
          Effect.map(basicExtMeta => JSON.stringify({
            ...basicExtMeta,
            version: devModeExtensionDir
              ? `file:${devModeExtensionDir}`
              : basicExtMeta.version,
          })),
          Effect.tap(extInfo => Effect.logDebug(`Extension data to write: ${JSON.stringify(extInfo)}`)),
          Effect.flatMap(source =>
            fs.writeFileString(join(outdir, 'package.json'), source)),
        )
      ),
    ]),
  );

  //yield * _(Effect.tryPromise(() =>
  //  esbuild({
  //    entryPoints: [extensionPathInOutdir],
  //    entryNames: '[dir]/[name]',
  //    assetNames: '[dir]/[name]',
  //    format: 'esm',
  //    target: ['esnext'],
  //    bundle: true,
  //  })
  //));
});


const fetchMaybeLocal = (url: string) => Effect.gen(function * (_) {
  const fs = yield * _(FileSystem.FileSystem);
  const result = (!url.startsWith('file://'))
    ? yield *_(
        Effect.tryPromise(() => fetch(url)),
        Effect.flatMap(resp => Effect.tryPromise(() => resp.text())),
      )
    : yield * _(fs.readFileString(url.split('file://')[1]!));
  return result;
});


const generateData =
({ datadir, outdir, forUsername, dataVersion }: S.Schema.Type<typeof SiteBuildConfigSchema>) =>
Effect.gen(function * (_) {
  const fs = yield * _(FileSystem.FileSystem);

  // `recursive` flag is broken at least on Node 18.
  // const objectPaths = yield * _(fs.readDirectory(datadir, { recursive: true }));
  const objectPaths = yield * _(readdirRecursive(datadir));

  const out: Record<string, unknown> = yield * _(Effect.reduceEffect(
    objectPaths.
    // TODO: Parse non-YAML files as well.
    filter(p => p.endsWith('.yaml') || p.endsWith('.yml')).
    map(path => pipe(
      fs.readFileString(join(datadir, path)),
      Effect.map(parseYAML),
      Effect.flatMap(S.decodeUnknown(S.Union(PaneronDataset, RegisterMeta, RegisterItem, Proposal), { onExcessProperty: "preserve" })),
      // TODO: Shouldn’t match registry-specific items?
      Effect.flatMap(S.decodeUnknown(S.Record(S.String, S.Unknown))),
      // Catches Schema.parse failures. We do nothing with non register items.
      Effect.catchTag(
        "ParseError",
        err => Effect.logDebug(`skipping non-object YAML at ${path} due to ${String(err)}`),
      ),
      Effect.map((out) =>
        out && shouldIncludeObjectInIndex(path, out, forUsername)
          ? ({ [`/${path}`]: out })
          : ({})),
    )),
    Effect.succeed({}),
    (accum, item) => ({ ...accum, ...item }),
    { concurrency: 10 },
  ));

  yield * _(fs.writeFileString(join(outdir, 'manifest.json'), JSON.stringify({
    forUsername,
    dataVersion,
  }, undefined, 4)));

  yield * _(fs.writeFileString(join(outdir, 'data.json'), JSON.stringify(out, undefined, 4)));
});


/**
 * Copy injectedEntries to site/spa/dist.
 */
const injectEntries = (opts: SiteBuildOptions) =>
Effect.gen(function * (_) {
  const fs = yield * _(FileSystem.FileSystem);
  const {
    injectedEntries,
  } = opts;
  const outdirFullPath = resolve(opts.outdir);

  /** Record all copied files, and output list as a manifest file. */
  const successfullyInjectedEntries: string[] = [];

  for (const entry of injectedEntries) {

    // Resolve each entry to its full path
    const entryFullPath = resolve(entry);
    const entryBaseName = entry.split('/').pop() ?? '';
    /**
     * Looks like it's not necessary to do mkdir_p.
     * `fs.copy()` handles it all for us.
     */
    const outFileFullPath = join(outdirFullPath, entryBaseName);

    yield * _(
      Effect.matchCauseEffect(
        Console.withTime(`Copying injected entry\nfrom: \u001b[1m${entryFullPath}\u001b[m\ninto: ${outdirFullPath}\n  as: ${outFileFullPath}`)(
          fs.copy(entryFullPath, outFileFullPath, { overwrite: true })
        ), {
          onFailure: (cause) => {
            switch (cause._tag) {
              case "Fail":
                return Console.warn(`Fail: ${cause.error.message}`);
              case "Die":
                return Console.warn(`Die: ${cause.defect}`);
              case "Interrupt":
                return Console.warn(`${cause.fiberId} interrupted!`);
            }
            return Console.error("failed due to other causes");
          },
          onSuccess: (() => {
            successfullyInjectedEntries.push(entryBaseName);
            return Console.log('Copied!');
          }),
        }
      ),
      Effect.orElse(() => Effect.logError(`Failed to copy injected entry\n      ${entryFullPath}\n  to: ${outdirFullPath}\n  as: ${outFileFullPath}.`)),
    );
  }

  return successfullyInjectedEntries;
});

/**
 * Copy all files and dirs from injectedAssetsDir to site/spa/dist.
 */
const injectAssetsDir = (opts: SiteBuildOptions) =>
Effect.gen(function * (_) {

  const fs = yield * _(FileSystem.FileSystem);
  const {
      injectedAssetsDir,
      injectedAssetsPrefix,
    } = opts;
  const outdirFullPath = resolve(opts.outdir);

  /** Record all copied files, and output list as a manifest file. */
  const successfullyInjectedAssets: string[] = [];

  /** Process injectedAssetsDir */
  if (typeof injectedAssetsDir === 'undefined') {
    return [];
  }
  const maybeDirStat = yield * _(fs.stat(injectedAssetsDir));

  if (maybeDirStat.type === 'Directory') {
    const paths = yield * _(readdirRecursive(injectedAssetsDir));
    const publicDirPrefix = injectedAssetsPrefix ?? '';
    /**
     * Looks like it's not necessary to do mkdir_p.
     * `fs.copy()` handles it all for us.
     */
    const dirBaseName = injectedAssetsDir.replace(/\/*$/, '').split('/').pop() ?? '';

    for (const relPath of paths) {
      const srcFile = join(injectedAssetsDir, relPath);
      const publicFilePath = join(publicDirPrefix, dirBaseName, relPath)
        // Replace 0 or more leading forward slashes with a single slash
        .replace(/^\/*/, '/');
      const destFile = join(outdirFullPath, publicFilePath);

      yield * _(
        Effect.matchCauseEffect(
          Console.withTime(`Copying asset\nfrom: \u001b[1m${srcFile}\u001b[m\ninto: ${outdirFullPath}\n  as: ${destFile}\n(served as \u001b[1m${publicFilePath}\u001b[m)`)(
            fs.copy(
              srcFile,
              destFile,
              { overwrite: true },
            )
          ), {
            onFailure: (cause) => {
              switch (cause._tag) {
                case "Fail":
                  return Console.warn(`Fail: ${cause.error.message}`);
                case "Die":
                  return Console.warn(`Die: ${cause.defect}`);
                case "Interrupt":
                  return Console.warn(`${cause.fiberId} interrupted!`);
              }
              return Console.error("failed due to other causes");
            },
            onSuccess: (() => {
              successfullyInjectedAssets.push(publicFilePath);
              return Console.log('Copied!');
            }),
          }
        ),
        Effect.orElse(() => Effect.logError(`Failed to copy injected asset\n      ${srcFile}\n  to: ${outdirFullPath}\n  as: ${destFile}\n(served as ${publicFilePath}).`)),
      );
    }
    return successfullyInjectedAssets;
  }

  return [];
});

/**
 * Copy injectedEntries to site/spa/dist.
 * Copy all files and dirs from injectedAssetsDir to site/spa/dist.
 */
const injectExtraResources = (opts: SiteBuildOptions) =>
Effect.gen(function * (_) {

  const fs = yield * _(FileSystem.FileSystem);
  const outdirFullPath = resolve(opts.outdir);

  /** Record all copied files, and output list as a manifest file. */
  const successfullyInjectedEntries: string[] = (yield * _(injectEntries(opts)));
  const successfullyInjectedAssets: string[] = (yield * _(injectAssetsDir(opts)));

  /**
   * Write all injected public file paths to a manifest file,
   * for loading dynamically in the client.
   */
  yield * _(
    fs.writeFileString(
      join(outdirFullPath, "injection-manifest.json"),
      JSON.stringify({
        injectedEntries: successfullyInjectedEntries,
        injectedAssets: successfullyInjectedAssets,
      }, undefined, 4),
    ),
  );
});


const runExtensionBuild = (opts: SiteBuildOptions) => (Effect.gen(function * (_) {

  // Template-specific build

  const templateBuildScriptPath = join(
    opts.siteTemplatePath,
    '..', // Step one directory up, since siteTemplatePath goes to dist
    'build-site.mjs',
  );

  const builder = yield * _(
    Console.withTime(`Importing site builder from ${templateBuildScriptPath}`)(
      Effect.tryPromise(() => import(templateBuildScriptPath))
    ),
    Effect.tapError(err => Effect.logError(`Failed to import template build script: ${String(err)}`)),
  );

  yield * _(
    Console.withTime(`Running site builder`)(
      builder.buildSite({ ...opts, packageRoot: PACKAGE_ROOT })
    ),
    Effect.tapError(err => Effect.logError(`Failed to run template build script: ${String(err)}`)),
  );

  // Extension build (?)
  // We don’t really run “extension build” per se yet.
  //
  //return yield * _(Effect.succeed(null));
  // Another option is to shell out, e.g. with execSync:
  //
  // let cliString = `${extensionBuildScriptPath} --datadir ${datadir} --outdir ${outdir}`;
  // if (dataVersion) {
  //   cliString += ` --dataversion ${dataVersion}`;
  // }
  // if (forUsername) {
  //   cliString += ` --forusername ${forUsername}`;
  // }
  // if (logLevel === 'debug') {
  //   cliString += ` --debug`;
  // } else if (logLevel === 'info') {
  //   cliString += ` --verbose`;
  // }
  //
  // yield * _(Effect.logDebug(`Build extension: calling ${cliString}`));
  //
  // yield * _(Effect.try(() => execSync(cliString, { stdio: 'inherit' })));

// TS rightfully thinks that this effect has `unknown` requirements,
// probably due to dynamic import, so we have to cast.
}) as Effect.Effect<FileSystem.FileSystem, PlatformError, never>);


/** @deprecated for cases requiring private data exclusion use other site templates. */
function shouldIncludeObjectInIndex(
  objPath: string,
  objData: Record<string, unknown>,
  forUsername: string | undefined,
) {
  if (forUsername !== undefined || !objPath.startsWith('proposals') || objData.state === 'accepted' || objData.state === 'accepted-on-appeal') {
    return true;
  } else {
    return false;
  }
}


const buildFull = (opts: S.Schema.Type<typeof SiteBuildConfigSchema>) => pipe(
  scaffoldOutdir(opts),

  Effect.andThen(() => Effect.all([
    fetchExtension(
      opts.datadir,
      opts.outdir,
      { devModeExtensionDirectory: opts.devModeExtensionDirectory },
    ),
    generateData(opts),
    injectExtraResources(opts),
    // runExtensionBuild(opts),
  ], { concurrency: 2 })),
);


const build = Command.
  make(
    'build',
    siteBuildOptions,
    (rawOpts) => pipe(
      Effect.try(() => parseSiteBuildConfig(rawOpts, PACKAGE_ROOT)),
      Effect.andThen((opts) => pipe(
        buildFull(opts),
        Logger.withMinimumLogLevel(EFFECT_LOG_LEVELS[opts.logLevel]),
      )),
    ),
  ).
  pipe(
    Command.withDescription('build site'),
  );

const watch = Command.
  make(
    'watch',
    {
      // TODO: Watch arbitrary directories, in addition to the datadir/template dir?
      // alsoWatch: Options.directory('also-watch', { exists: 'yes' }).pipe(
      //   //Options.repeated,  // XXX https://github.com/Effect-TS/cli/issues/435
      //   Options.optional),

      // Watches site template
      watchTemplate: Options.boolean('watch-template').pipe(
        Options.optional),

      // What to ignore when watching
      // TODO: Regexp for watch ignore?
      ignorePrefix: Options.text('ignore-prefix').pipe(
        Options.optional),

      serve: Options.boolean('serve').pipe(
        Options.withDefault(false)),

      port: Options.integer('port').pipe(
        Options.withDefault(8080)),
    },
    ({ watchTemplate, ignorePrefix, serve, port }) =>
      Effect.
        gen(function * (_) {
          const rawBuildOpts = yield * _(build);
          const buildOpts =
            yield * _(Effect.try(() => parseSiteBuildConfig(rawBuildOpts, PACKAGE_ROOT)));

          yield * _(
            buildFull(buildOpts),
            Logger.withMinimumLogLevel(EFFECT_LOG_LEVELS[buildOpts.logLevel]),
          );

          if (serve) {
            yield * _(
              Effect.fork(
                Layer.launch(Layer.scopedDiscard(
                  Effect.gen(function * (_) {
                    //const srv = yield * _(ServerContext);
                    const runtime = yield * _(Effect.runtime<never>());
                    const runFork = Runtime.runFork(runtime);

                    yield * _(
                      Effect.acquireRelease(
                        Effect.sync(() => {
                          console.log(`Serving on port ${port}.  Access at http://localhost:${port}`);

                          return simpleServe(
                            buildOpts.outdir,
                            port,
                            {
                              onDebug: (msg: string) => runFork(Effect.logDebug(msg)),
                              onError: (msg: string) => runFork(Effect.logError(msg)),
                              onWarning: (msg: string) => runFork(Effect.logWarning(msg)),
                            },
                          )
                        }),
                        (srv) => Effect.sync(() => srv.close()),
                      ),
                    );
                  })
                )),
              ),
              Logger.withMinimumLogLevel(EFFECT_LOG_LEVELS[buildOpts.logLevel]),
            );
          }

          const ignorePrefixes = [
            ...(Option.isNone(ignorePrefix) ? [] : [ignorePrefix.value]),
            // Spurious changes:
            // Outdir is modified during build
            // and reacting to it would cause infinite rebuilds:
            resolve(buildOpts.outdir),
            '.git',
          ];

          const watchedDirs = [
            buildOpts.datadir,
            ...(watchTemplate ? [buildOpts.siteTemplatePath] : []),
          ];

          yield * _(
            debouncedWatcher(watchedDirs, ignorePrefixes, 1000),
            Stream.runForEach(path => Effect.gen(function * (_) {
              yield * _(Effect.logDebug(`Path changed: ${path}`));
              if (path.startsWith(buildOpts.datadir)) {
                yield * _(Effect.all([
                  generateData(buildOpts),
                  runExtensionBuild(buildOpts),
                ], { concurrency: 5 }));
              } else {
                yield * _(scaffoldTemplate(buildOpts.siteTemplatePath, buildOpts.outdir));
              }
            })),
            Logger.withMinimumLogLevel(EFFECT_LOG_LEVELS[buildOpts.logLevel]),
          );
        })
  ).
  pipe(
    Command.withDescription('watch for changes'),
  );

const main = build.
  pipe(
    Command.withSubcommands([watch]),
    Command.run({
      name: "Paneron site builder (WIP)",
      version: "N/A",
    }),
  );

Effect.
  suspend(() => main(process.argv)).
  pipe(
    Effect.provide(NodeContext.layer),
    NodeRuntime.runMain,
  );


const clearDirectoryContents =
(directoryPath: string):
Effect.Effect<void, PlatformError, FileSystem.FileSystem> =>
  Effect.gen(function * (_) {
    const fs = yield * _(FileSystem.FileSystem);
    const dirContents = yield * _(fs.readDirectory(directoryPath));

    yield * _(Effect.forEach(
      dirContents,
      (path) => Effect.gen(function * (_) {
        const pathRelative = join(directoryPath, path);
        const maybeStat = yield * _(fs.stat(pathRelative));
        if (maybeStat.type === 'Directory') {
          // We could technically preserve directory structure…
          //yield * _(clearDirectoryContents(pathRelative));
          yield * _(fs.remove(pathRelative, { recursive: true }));
        } else {
          yield * _(fs.remove(pathRelative));
        }
      }),
      { concurrency: 10 },
    ));
  });
