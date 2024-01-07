#!/usr/bin/env node

/**
 * Handles building a site.
 *
 * Is a `bin` entry point and one of the primary APIs,
 * if not *the* primary API of this entire package.
 *
 * Depends on Node, currently.
 */

import { resolve, relative, join } from 'node:path';

import { parse as parseYAML } from 'yaml';


import { pipe, Runtime, Console, Stream, Effect, Layer, Logger, Types, Option } from 'effect';
import * as S from '@effect/schema/Schema';
import { FileSystem, NodeContext, Runtime as PlatformRuntime } from '@effect/platform-node';
import type { PlatformError } from '@effect/platform-node/Error';
import { Options, Command } from '@effect/cli';
import type { Command as Command_ } from '@effect/cli/Command';

import {
  BaseBuildConfigFromCLIArgs,
  type LogLevel as _LogLevel,
  outputOptions,
  BaseBuildConfigSchema,
  serve as simpleServe,
  EFFECT_LOG_LEVELS,
} from './util/index.mjs';
import { debouncedWatcher } from './util/watch2.mjs';
import { getExtensionURL, PaneronDataset } from './model.mjs';
import { CONTRIB_SITE_TEMPLATES, ContribSiteTemplateName } from './site/index.mjs';


// We will need to access this package’s
// actual, unpacked source file location when building the site.
const PACKAGE_ROOT = resolve(join(import.meta.url.split('file://')[1]!, '..'));

/** Returns absolute path to given contrib site template. */
function getPathToSiteTemplate(
  templateName: S.Schema.To<typeof ContribSiteTemplateName>,
) {
  return join(PACKAGE_ROOT, 'site', templateName, 'dist');
}


const siteBuildOptions = {
  outdir: Options.directory('outdir'),
  datadir: Options.directory('datadir', { exists: 'yes' }).pipe(
    Options.optional),
  siteTemplateName: Options.choice('template', CONTRIB_SITE_TEMPLATES).pipe(
    Options.withDefault(CONTRIB_SITE_TEMPLATES[0])),
  ...outputOptions,
} as const;


const SiteBuildConfigSchema = S.struct({
  outdir: S.string.pipe(S.nonEmpty()),
  siteTemplatePath: S.string.pipe(S.nonEmpty()),
  datadir: S.string.pipe(S.nonEmpty()),
}).pipe(
  S.extend(BaseBuildConfigSchema),
);


/**
 * Prepares the outdir with site template.
 * If outdir already exists, clears it first.
 */
const scaffoldOutdir = ({
  outdir,
  datadir,
  siteTemplatePath,
}: S.Schema.To<typeof SiteBuildConfigSchema>) =>
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
      fetchExtension(datadir, outdir)
    ),
  ], { concurrency: 4 }));
});


const scaffoldTemplate = (siteTemplatePath: string, outdir: string) =>
Effect.gen(function * (_) {
  const fs = yield * _(FileSystem.FileSystem);
  yield * _(Console.withTime(`Scaffold site template from ${siteTemplatePath} into ${outdir}`)(
    fs.copy(siteTemplatePath, outdir, { overwrite: true })
  ));
});


const fetchExtension = (datadir: string, outdir: string) =>
Effect.gen(function * (_) {
  const fs = yield * _(FileSystem.FileSystem);

  const datasetMetaPath = join(datadir, 'panerondataset.yaml');
  yield * _(fs.access(datasetMetaPath, { readable: true }));
  const data = yield * _(
    fs.readFileString(datasetMetaPath),
    Effect.map(parseYAML),
    Effect.flatMap(S.parse(PaneronDataset)),
  );

  const extensionURL = getExtensionURL(data.type.id);
  const extensionPathInOutdir = join(outdir, 'extension.js');

  const extensionCode = yield * _(
    Console.withTime(`Fetch extension code for ${extensionURL} to ${extensionPathInOutdir}`)(pipe(
      Effect.tryPromise(() => fetch(extensionURL)),
      Effect.flatMap(resp => Effect.tryPromise(() => resp.text())),
      Effect.flatMap(S.parse(S.string)),
    )),
  );

  yield * _(fs.writeFileString(extensionPathInOutdir, extensionCode));

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


const readdirRecursive = (
  /** Directory to list. */
  dir: string,
  /** Directory to output paths relative to. */
  relativeTo?: string,
):
Effect.Effect<FileSystem.FileSystem, PlatformError, readonly string[]> =>
Effect.gen(function * (_) {
  const fs = yield * _(FileSystem.FileSystem);
  const dirEntries = yield * _(fs.readDirectory(dir));
  const dirEntriesFull = dirEntries.map(path => join(dir, path));

  const stats = yield * _(Effect.reduceEffect(
    dirEntriesFull.map(path => pipe(
      fs.stat(path),
      Effect.map(stat => ({ [path]: stat })),
    )),
    Effect.succeed({} as Record<string, FileSystem.File.Info>),
    (accum, item) => ({ ...accum, ...item }),
    { concurrency: 10 },
  ));

  const mapEffects = dirEntriesFull.map(path =>
    stats[path]?.type === 'Directory'
      ? readdirRecursive(path, relativeTo ?? dir)
      : Effect.succeed([relative(relativeTo ?? dir, path)])
    );

  const list = yield * _(
    Effect.all(mapEffects, { concurrency: 10 }),
    Effect.map(pathBunch => pathBunch.flat()),
  );

  return list;
});


//const listRecursive = (path: string) => Effect.gen(function * (_) {
//  const fs = yield * _(FileSystem.FileSystem);
//  yield * _(
//});


const generateData = (datadir: string, outdir: string) =>
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
      Effect.flatMap(S.parse(S.record(S.string, S.unknown))),
      //Effect.flatMap(S.parse(RegisterItem)),
      // Catches Schema.parse failures. We do nothing with non register items.
      Effect.catchTag(
        "ParseError",
        err => Effect.logDebug(`skipping non-object YAML at ${path} due to ${String(err)}`),
      ),
      Effect.map((out) =>
        out && shouldIncludeObjectInIndex(path, out)
          ? ({ [`/${path}`]: out })
          : ({})),
    )),
    Effect.succeed({}),
    (accum, item) => ({ ...accum, ...item }),
    { concurrency: 10 },
  ));

  yield * _(fs.writeFileString(join(outdir, 'data.json'), JSON.stringify(out, undefined, 4)));
});


function shouldIncludeObjectInIndex(objPath: string, objData: Record<string, unknown>) {
  if (!objPath.startsWith('proposals') || objData.state === 'accepted' || objData.state === 'accepted-on-appeal') {
    return true;
  } else {
    return false;
  }
}


const buildFull = (opts: S.Schema.To<typeof SiteBuildConfigSchema>) =>
Effect.gen(function * (_) {
  yield * _(scaffoldOutdir(opts));
  yield * _(Effect.all([
    fetchExtension(opts.datadir, opts.outdir),
    generateData(opts.datadir, opts.outdir),
  ], { concurrency: 2 }));
});


const build = Command.
  make(
    'build',
    siteBuildOptions,
    (rawOpts) =>
      Effect.
        gen(function * (_) {
          const opts = yield * _(Effect.try(() => parseOptionsSync(rawOpts)));
          yield * _(
            buildFull(opts),
            Logger.withMinimumLogLevel(EFFECT_LOG_LEVELS[opts.logLevel]),
          );
        })
  ).
  pipe(
    Command.withDescription('asdf'),
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
            yield * _(Effect.try(() => parseOptionsSync(rawBuildOpts)));

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
                        Effect.sync(() => simpleServe(
                          buildOpts.outdir,
                          port,
                          {
                            onDebug: (msg) => runFork(Effect.logDebug(msg)),
                            onError: (msg) => runFork(Effect.logError(msg)),
                          },
                        )),
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
                yield * _(generateData(buildOpts.datadir, buildOpts.outdir));
              } else {
                yield * _(scaffoldTemplate(buildOpts.siteTemplatePath, buildOpts.outdir));
              }
            })),
            Logger.withMinimumLogLevel(EFFECT_LOG_LEVELS[buildOpts.logLevel]),
          );
        })
  ).
  pipe(
    Command.withDescription('do the watchin’'),
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
  suspend(() => main(process.argv.slice(2))).
  pipe(
    Effect.provide(NodeContext.layer),
    PlatformRuntime.runMain,
  );


const clearDirectoryContents =
(directoryPath: string):
Effect.Effect<FileSystem.FileSystem, PlatformError, void> =>
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


function parseOptionsSync(
  rawOpts: Types.Simplify<Command_.ParseConfig<typeof siteBuildOptions>>,
) {
  const { outdir, siteTemplateName, datadir, ...baseOpts } = rawOpts;
  return S.parseSync(SiteBuildConfigSchema)({
    outdir,
    datadir: Option.isNone(datadir) ? process.cwd() : datadir.value,
    siteTemplatePath: getPathToSiteTemplate(siteTemplateName),
    ...S.parseSync(BaseBuildConfigFromCLIArgs)(baseOpts),
  });
}
