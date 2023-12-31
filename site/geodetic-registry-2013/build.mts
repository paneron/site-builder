/** Builds template’s JS. */

// XXX: Should be generalized

import { resolve, join } from 'node:path';

import * as S from '@effect/schema/Schema';
import { Logger, Effect } from 'effect';
import { NodeContext, Runtime } from '@effect/platform-node';
import { Command } from '@effect/cli';
import { build as esbuild } from 'esbuild';

import {
  type BaseBuildOptions,
  BaseBuildConfigFromCLIArgs,
  outputOptions,
  EFFECT_LOG_LEVELS,
} from '../../util/index.mjs';
//import { ContribSiteTemplateName, CONTRIB_SITE_TEMPLATES } from './site/index.mjs';

const PACKAGE_ROOT = resolve(join(import.meta.url.split('file://')[1]!, '..'));

console.debug("site-app build", PACKAGE_ROOT);


const preparePackage = Command.make('package', outputOptions, (rawOpts) => {
  return Effect.gen(function * (_) {
    const opts = yield * _(S.parse(BaseBuildConfigFromCLIArgs)(rawOpts));
    //yield * _(Effect.tryPromise(() => buildSiteBuilder(opts)));
    yield * _(
      Effect.all([
        Effect.logDebug(`Using package root: ${PACKAGE_ROOT}`),
        Effect.tryPromise(() => buildSiteTemplate(opts)),
        //...CONTRIB_SITE_TEMPLATES.map(templateName =>
        //  Effect.tryPromise(() =>
        //    buildSiteTemplate({ ...opts, templateName })
        //  )
        //)
      ], { concurrency: 'unbounded' }),
      Effect.tap(Effect.logDebug("Done building.")),
      Logger.withMinimumLogLevel(EFFECT_LOG_LEVELS[opts.logLevel]),
    );
  });
});

const main = Command.run(
  preparePackage,
  {
    name: "Site template builder (internal script)",
    version: "N/A",
  },
);

Effect.
  suspend(() => main(process.argv.slice(2))).
  pipe(
    Effect.provide(NodeContext.layer),
    Runtime.runMain);

/**
 * Builds site template.
 *
 * Currently, that just involves running esbuild against JS.
 */
async function buildSiteTemplate(opts: BaseBuildOptions) {
  //const siteRoot = join(PACKAGE_ROOT, 'site', opts.templateName);
  //const siteRoot = join(PACKAGE_ROOT, 'site-app');
  return await esbuild({
    entryPoints: [
      join(PACKAGE_ROOT, 'index.tsx'),
      //join(PACKAGE_ROOT, 'imports.mts'),
      //join(PACKAGE_ROOT, 'site', 'index.tsx'),
    ],
    entryNames: '[dir]/[name]',
    assetNames: '[dir]/[name]',
    format: 'iife',
    target: ['chrome120'],
    bundle: true,
    external: ['#ext'],
    //packages: 'external',
    minify: false,
    treeShaking: true,
    sourcemap: false,
    platform: 'browser',
    //publicPath: 'https://convertor.glossarist.org/',
    outfile: join(PACKAGE_ROOT, 'index.js'),
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

