#!/usr/bin/env node

/**
 * Handles building a site.
 *
 * Is a `bin` entry point and one of the primary APIs,
 * if not *the* primary API of this entire package.
 *
 * Depends on Node, currently.
 */

import { resolve, join, isAbsolute } from 'node:path';
import { mkdir, access, constants } from 'node:fs/promises';
import { parseArgs } from 'node:util';

import { Console, Stream, Effect, Logger, LogLevel, Types, Option } from 'effect';
import * as S from '@effect/schema/Schema';
import { FileSystem, NodeContext, Runtime } from '@effect/platform-node';
import type { PlatformError } from '@effect/platform-node/Error';
import { Options, Command } from '@effect/cli';
import type { Command as Command_ } from '@effect/cli/Command';

import {
  type BaseBuildOptions,
  BaseBuildConfigFromCLIArgs,
  type LogLevel as _LogLevel,
  outputOptions,
  BaseBuildConfigSchema,
  makeSequential,
  watchAndCall,
  serve,
} from './util/index.mjs';
import { debouncedWatcher } from './util/watch2.mjs';
import { CONTRIB_SITE_TEMPLATES, ContribSiteTemplateName } from './site/index.mjs';


const EFFECT_LOG_LEVELS: { [key in _LogLevel]: LogLevel.LogLevel } = {
  'debug': LogLevel.Debug,
  'info': LogLevel.Info,
  'error': LogLevel.Error,
  'silent': LogLevel.None,
} as const;


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


// const ServeConfig = S.struct({
//   serve: S.literal(true),
//   port: S.optional(
//     S.number.pipe(S.int(), S.positive(), S.lessThan(10000)),
//     { default: () => 8080 },
//   ),
// });
// 
// const NoServeConfig = S.struct({
//   serve: S.literal(false),
// });

// const SiteWatchConfigSchema = S.struct({
//   watch: S.array(S.string.pipe(S.nonEmpty())),
//   ignorePrefixWhenWatching: S.union(S.string.pipe(S.nonEmpty()), S.undefined),
// }).pipe(
//   S.extend(S.union(ServeConfig, NoServeConfig)),
//   S.extend(BaseBuildConfigSchema),
// );


const doBuild = ({
  outdir,
  datadir,
  siteTemplatePath,
}: S.Schema.To<typeof SiteBuildConfigSchema>) =>
  Effect.
    gen(function * (_) {
      const fs = yield * _(FileSystem.FileSystem);

      // Prepare outdir
      const maybeStat = yield * _(Effect.either(fs.stat(outdir)));
      yield * _(Effect.matchEffect(maybeStat, {
        onSuccess: (stat) => Effect.gen(function * (_) {
          if (stat.type === 'Directory') {
            // If outdir already exists and is a directory, clean it before building.
            yield * _(Console.warn(`Cleaning preexisting ‘outdir’`));
            yield * _(Console.withTime(`Removing contents of ${outdir}`)(
              clearDirectoryContents(outdir)
            ));
          } else {
            // This should not be possible thanks to option typing
            yield * _(Effect.fail(`‘outdir’ exists at ${outdir}, and is not a directory.`));
          }
        }),
        // If stat failed, assume directory doesn’t exist (we can create it)
        onFailure: Effect.succeed,
      }));
      yield * _(fs.makeDirectory(outdir, { recursive: true }));

      // Copy site template
      yield * _(Console.withTime(`Copy site template from ${siteTemplatePath} to ${outdir}`)(
        fs.copy(siteTemplatePath, outdir)
      ));

      //if (opts.serve) {
      //  //yield * _(Effect.scoped(serveUntilAborted(opts.port, opts.outdir, controller.signal)));
      //  yield * _(Effect.forkDaemon(Effect.scoped(Effect.acquireRelease(
      //    Effect.sync(() => serve(opts.outdir, opts.port)),
      //    server => Effect.sync(() => server.close()),
      //  ))));
      //}
    })


const build = Command.
  make(
    'build',
    siteBuildOptions,
    (rawOpts) =>
      Effect.
        gen(function * (_) {
          const opts = yield * _(Effect.try(() => Object.freeze(parseOptionsSync(rawOpts))));
          yield * _(
            doBuild(opts),
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
      // TODO: Watch other directories, in addition to the datadir
      // alsoWatch: Options.directory('also-watch', { exists: 'yes' }).pipe(
      //   //Options.repeated,  // XXX https://github.com/Effect-TS/cli/issues/435
      //   Options.optional),

      // What to ignore when watching
      // TODO: Regexp for watch ignore?
      ignorePrefix: Options.text('ignore-prefix').pipe(
        Options.optional),

      serve: Options.boolean('serve').pipe(
        Options.withDefault(false)),

      port: Options.integer('port').pipe(
        Options.withDefault(8080)),
    },
    ({ ignorePrefix, serve, port }) =>
      Effect.
        gen(function * (_) {
          const rawBuildOpts = yield * _(build);
          const buildOpts =
            yield * _(Effect.try(() => parseOptionsSync(rawBuildOpts)));

          const ignorePrefixes = [
            ...(Option.isNone(ignorePrefix) ? [] : [ignorePrefix.value]),
            // Spurious changes:
            // Outdir is modified during build
            // and reacting to it would cause infinite rebuilds:
            resolve(buildOpts.outdir),
            '.git',
          ];
          yield * _(
            Effect.
              gen(function * (_) {
                yield * _(
                  debouncedWatcher(buildOpts.datadir, ignorePrefixes, 1000),
                  Stream.runForEach(path => Effect.gen(function * (_) {
                    yield * _(Console.debug(`Path changed: ${path}`));
                    yield * _(doBuild(buildOpts));
                  })),
                );
              }),
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
    Runtime.runMain,
  );


// We will need to access this package’s source when building the site:
const PACKAGE_ROOT = resolve(join(import.meta.url.split('file://')[1]!, '..'));


console.debug("My source is at", PACKAGE_ROOT);


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


function getPathToSiteTemplate(
  templateName: S.Schema.To<typeof ContribSiteTemplateName>,
) {
  return join(PACKAGE_ROOT, 'site', templateName);
}



interface BuildOptions extends BaseBuildOptions {
  /** Dataset root. Absolute path. */
  datadir: string;
  /** Where to output the site. Absolute or relative to cwd. */
  outdir: string;
}


//await main();


/** Entry point when invoked as CLI script. */
export async function mainOld() {

  const { values } = parseArgs({
    options: {
      debug: { type: 'boolean' },
      verbose: { type: 'boolean' },

      datadir: { type: 'string', default: process.cwd() },
      outdir: { type: 'string' },

      // See serve() & watchAndCall()
      serve: { type: 'boolean' },
      port: { type: 'string' },
      // Extra directories to watch, *relative to current package*
      watch: { type: 'string', multiple: true },

      // See BuildOptions.distdir
    },
  });

  if (!values.outdir) {
    throw new Error("Please provide outdir");
  }

  const datadir = values.datadir
    ? isAbsolute(values.datadir)
        ? values.datadir
        : join(process.cwd(), values.datadir)
    : process.cwd();

  const buildOpts: BuildOptions = {
    datadir,
    outdir: values.outdir,
    logLevel:
      values.debug
        ? 'debug'
        : values.verbose
            ? 'info'
            : 'error',
  };

  // Monkey-patch console into desired log level :/
  // if (!values.debug) {
  //   console.debug = noop;
  //   if (!values.verbose) {
  //     console.log = noop;
  //     // info is considered higher level than log, and will be output
  //   }
  // }

  console.debug(`Using data from ${buildOpts.datadir}`)
  console.debug(`Building to ${buildOpts.outdir}`)

  const _build = makeSequential(async function buildCLI() {
    return await build(buildOpts);
  });

  await mkdir(buildOpts.outdir, { recursive: true });

  await Promise.all([
    access(buildOpts.outdir, constants.W_OK),
    access(buildOpts.datadir, constants.R_OK),
  ]);

  if (values.serve) {
    const port = parseInt(values.port ?? '8080', 10);
    const ac = new AbortController();
    function abortServe() { ac.abort(); }
    process.on('SIGINT', abortServe);
    try {
      await _build();
      serve(
        buildOpts.outdir,
        port,
        ac.signal);
      await watchAndCall(
        buildOpts.datadir,
        [],
        ['.git'],
        _build,
        ac.signal);
    } catch (e) {
      abortServe();
      throw e;
    }
  } else {
    if (values.port) {
      throw new Error("Option --port <N> can only be given with --serve set");
    }
    await _build();
  }
}
