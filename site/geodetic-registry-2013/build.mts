/** Builds template’s JS. */

// XXX: Should be generalized

import { resolve, join } from 'node:path';

import { Stream, Console, Logger, Effect } from 'effect';
import { FileSystem, NodeContext, Runtime } from '@effect/platform-node';
import { Command } from '@effect/cli';
import { build as esbuild } from 'esbuild';

import {
  type ReportingOptions,
  parseReportingConfig,
  reportingOptions,
  EFFECT_LOG_LEVELS,
} from '../../util/index.mjs';
import { debouncedWatcher } from '../../util/watch2.mjs';
//import { ContribSiteTemplateName, CONTRIB_SITE_TEMPLATES } from './site/index.mjs';


const PACKAGE_ROOT = resolve(join(import.meta.url.split('file://')[1]!, '..'));
const OUTDIR = join(PACKAGE_ROOT, 'dist');


console.debug("site-app build", PACKAGE_ROOT);


const distFull = (opts: ReportingOptions) => Effect.all([
  Effect.logDebug(`Using package root: ${PACKAGE_ROOT}`),
  Effect.tryPromise(() => buildSiteTemplate(opts)),
  Console.withTime("Copy assets")(
    Effect.gen(function * (_) {
      const fs = yield * _(FileSystem.FileSystem);
      yield * _(
        fs.copy(
          join(PACKAGE_ROOT, 'index.html'),
          join(OUTDIR, 'index.html'),
          { overwrite: true },
        ),
      );
    })
  ),
], { concurrency: 'unbounded' });


const dist = Command.
  make(
    'dist',
    {
      ...reportingOptions,
    },
    (rawOpts) => Effect.gen(function * (_) {
      const opts = yield * _(Effect.try(() => parseReportingConfig(rawOpts)));
      //yield * _(Effect.tryPromise(() => buildSiteBuilder(opts)));
      yield * _(
        distFull(opts),
        Effect.tap(Effect.logDebug("Done building.")),
        Logger.withMinimumLogLevel(EFFECT_LOG_LEVELS[opts.logLevel]),
      );
    })
  );

const watch = Command.
  make(
    'watch',
    {
      // TODO: Watch arbitrary directories, in addition to the datadir/template dir?
      // alsoWatch: Options.directory('also-watch', { exists: 'yes' }).pipe(
      //   //Options.repeated,  // XXX https://github.com/Effect-TS/cli/issues/435
      //   Options.optional),
      // What to ignore when watching
      // TODO: Regexp for watch ignore?
      // ignorePrefix: Options.text('ignore-prefix').pipe(
      //   Options.optional),
    },
    () => Effect.gen(function * (_) {
      const rawOpts = yield * _(dist);
      const opts = yield * _(Effect.try(() => parseReportingConfig(rawOpts)));

      yield * _(
        distFull(opts),
        Logger.withMinimumLogLevel(EFFECT_LOG_LEVELS[opts.logLevel]),
      );

      yield * _(
        debouncedWatcher([PACKAGE_ROOT], [OUTDIR], 1000),
        Stream.runForEach(path => Effect.gen(function * (_) {
          yield * _(Console.debug(`Path changed: ${path}`));
          yield * _(distFull(opts));
        })),
        Logger.withMinimumLogLevel(EFFECT_LOG_LEVELS[opts.logLevel]),
      );
    })
  ).
  pipe(
    Command.withDescription('watch files for changes'),
  );

const main = dist.
  pipe(
    Command.withSubcommands([watch]),
    Command.run({
      name: "Site template builder (internal script)",
      version: "N/A",
    }),
  );

Effect.
  suspend(() => main(process.argv.slice(2))).
  pipe(
    Effect.provide(NodeContext.layer),
    Runtime.runMain,
  );

/**
 * Builds site template.
 *
 * Currently, that just involves running esbuild against JS.
 */
async function buildSiteTemplate(opts: ReportingOptions) {
  //const siteRoot = join(PACKAGE_ROOT, 'site', opts.templateName);
  //const siteRoot = join(PACKAGE_ROOT, 'site-app');
  return await esbuild({
    entryPoints: [
      join(PACKAGE_ROOT, 'index.tsx'),
      join(PACKAGE_ROOT, 'loader.ts'),
      //join(PACKAGE_ROOT, 'imports.mts'),
      //join(PACKAGE_ROOT, 'site', 'index.tsx'),
    ],
    entryNames: '[dir]/[name]',
    assetNames: '[dir]/[name]',
    tsconfig: join(PACKAGE_ROOT, 'tsconfig.json'),
    format: 'iife',
    target: ['chrome120'],
    bundle: true,
    //external: ['#ext'],
    //packages: 'external',
    minify: false,
    treeShaking: true,
    sourcemap: false,
    platform: 'browser',
    //publicPath: 'https://convertor.glossarist.org/',
    outdir: join(PACKAGE_ROOT, 'dist'),
    //outdir: PACKAGE_ROOT,
    write: true,
    loader: {
      '.css': 'css',
      '.module.css': 'local-css',
      // '.jpg': 'file',
      // '.png': 'file',
    },
    logLevel: opts.logLevel,
    plugins: [],
  });
}

