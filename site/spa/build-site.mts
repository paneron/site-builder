#!/usr/bin/env node

/** Builds a site. */

// XXX: Should be generalized

import { resolve, join } from 'node:path';

import { Stream, Console, Logger, Effect } from 'effect';
import { NodeContext, Runtime } from '@effect/platform-node';
import { Command } from '@effect/cli';

import {
  parseSiteBuildConfig,
  siteBuildOptions,
  EFFECT_LOG_LEVELS,
} from '../../util/index.mjs';
import { debouncedWatcher } from '../../util/watch2.mjs';
import { buildSite } from './build-site-core.mjs';

//import { ContribSiteTemplateName, CONTRIB_SITE_TEMPLATES } from './site/index.mjs';


const PACKAGE_ROOT = resolve(join(import.meta.url.split('file://')[1]!, '..'));
//const OUTDIR = join(PACKAGE_ROOT, 'dist');


console.debug("site-app build", PACKAGE_ROOT);


const dist = Command.
  make(
    'dist',
    siteBuildOptions,
    (rawOpts) => Effect.gen(function * (_) {
      const opts = yield * _(Effect.try(() => parseSiteBuildConfig(rawOpts, PACKAGE_ROOT)));
      //yield * _(Effect.tryPromise(() => buildSiteBuilder(opts)));
      yield * _(
        // distSPA({ ...opts, packageRoot: PACKAGE_ROOT, outdir: OUTDIR }),
        // Effect.tap(() => Effect.logDebug(`Done pretending to build site from ${PACKAGE_ROOT} to ${OUTDIR}`)),
        buildSite({ ...opts, packageRoot: PACKAGE_ROOT }),
        Effect.tap(() => Effect.logDebug(`Done pretending to build site given ${opts.datadir} outdir, ${PACKAGE_ROOT} package root, into outdir ${opts.outdir}`)),
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
      const opts = yield * _(Effect.try(() => parseSiteBuildConfig(rawOpts, PACKAGE_ROOT)));

      yield * _(
        //distSPA({ ...opts, packageRoot: PACKAGE_ROOT, outdir: OUTDIR }),
        Effect.logDebug("Done pretending to build site."),
        Logger.withMinimumLogLevel(EFFECT_LOG_LEVELS[opts.logLevel]),
      );

      yield * _(
        debouncedWatcher([PACKAGE_ROOT], [opts.outdir], 1000),
        Stream.runForEach(path => Effect.gen(function * (_) {
          yield * _(Console.debug(`Path changed: ${path}`));
          yield * _(Effect.logDebug("Done pretending to build site."));
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
