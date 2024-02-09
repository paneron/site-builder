/** Builds template’s JS, wrapping ./dist.mts. */

// XXX: Should be generalized

import { resolve, join } from 'node:path';

import { Stream, Console, Logger, Effect } from 'effect';
import { NodeContext, Runtime } from '@effect/platform-node';
import { Command } from '@effect/cli';

import {
  parseReportingConfig,
  reportingOptions,
  EFFECT_LOG_LEVELS,
} from '../../util/index.mjs';
import { debouncedWatcher } from '../../util/watch2.mjs';
//import { ContribSiteTemplateName, CONTRIB_SITE_TEMPLATES } from './site/index.mjs';

import { distSPA } from './dist.mjs';


const PACKAGE_ROOT = resolve(join(import.meta.url.split('file://')[1]!, '..'));
const OUTDIR = join(PACKAGE_ROOT, 'dist');


console.debug("site-app build", PACKAGE_ROOT);


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
        distSPA({ ...opts, packageRoot: PACKAGE_ROOT, outdir: OUTDIR }),
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
        distSPA({ ...opts, packageRoot: PACKAGE_ROOT, outdir: OUTDIR }),
        Logger.withMinimumLogLevel(EFFECT_LOG_LEVELS[opts.logLevel]),
      );

      yield * _(
        debouncedWatcher([PACKAGE_ROOT], [OUTDIR], 1000),
        Stream.runForEach(path => Effect.gen(function * (_) {
          yield * _(Console.debug(`Path changed: ${path}`));
          yield * _(distSPA({ ...opts, packageRoot: PACKAGE_ROOT, outdir: OUTDIR }));
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
