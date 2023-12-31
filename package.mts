/**
 * Packages itself (site-builder).
 *
 * Used in development/release flow, used by package.json scripts.
 *
 * Depends on Node.
 */

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
} from './util/index.mjs';
//import { ContribSiteTemplateName, CONTRIB_SITE_TEMPLATES } from './site/index.mjs';


const PACKAGE_ROOT = resolve(join(import.meta.url.split('file://')[1]!, '..'));


const preparePackage = Command.make('package', outputOptions, (rawOpts) => {
  return Effect.gen(function * (_) {
    const opts = yield * _(S.parse(BaseBuildConfigFromCLIArgs)(rawOpts));
    //yield * _(Effect.tryPromise(() => buildSiteBuilder(opts)));
    yield * _(
      Effect.all([
        Effect.logDebug(`Using package root: ${PACKAGE_ROOT}`),
        Effect.tryPromise(() => buildSiteBuilder(opts)),
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
    name: "Site builder builder (internal script)",
    version: "N/A",
  },
);

Effect.
  suspend(() => main(process.argv.slice(2))).
  pipe(
    Effect.provide(NodeContext.layer),
    Runtime.runMain);


/** Builds the entry point for site build CLI command. */
async function buildSiteBuilder(opts: BaseBuildOptions) {
  const { logLevel } = opts;
  return await esbuild({
    entryPoints: [
      join(PACKAGE_ROOT, 'build-site.mts'),
      //join(PACKAGE_ROOT, 'site', 'index.tsx'),
    ],
    entryNames: '[dir]/[name]',
    assetNames: '[dir]/[name]',
    format: 'esm',
    target: ['esnext'],
    bundle: true,

    // We cannot make dependencies external, because
    // package’s bin scripts don’t seem to have access
    // to package dependencies.
    //external: ['react', 'react-dom', '@effect/*', 'effect'],

    minify: false,
    treeShaking: true,
    sourcemap: false,
    platform: 'node',
    //publicPath: 'https://convertor.glossarist.org/',
    outfile: 'build-site.mjs',
    write: true,
    loader: {
      '.css': 'local-css',
      // '.jpg': 'file',
      // '.png': 'file',
    },
    logLevel,
    plugins: [],
  });
}


// /**
//  * Builds site template.
//  *
//  * Currently, that just involves running esbuild against JS.
//  */
// async function buildSiteTemplate(
//   opts: BaseBuildOptions & { templateName: S.Schema.To<typeof ContribSiteTemplateName> },
// ) {
//   //const siteRoot = join(PACKAGE_ROOT, 'site', opts.templateName);
//   const siteRoot = join(PACKAGE_ROOT, 'site-app');
//   return await esbuild({
//     entryPoints: [
//       join(siteRoot, 'index.tsx'),
//       //join(PACKAGE_ROOT, 'site', 'index.tsx'),
//     ],
//     entryNames: '[dir]/[name]',
//     assetNames: '[dir]/[name]',
//     format: 'esm',
//     target: ['esnext'],
//     bundle: true,
//     //external: ['react', 'react-dom', '#ext'],
//     //packages: 'external',
//     minify: false,
//     treeShaking: true,
//     sourcemap: 'inline',
//     platform: 'node',
//     //publicPath: 'https://convertor.glossarist.org/',
//     outfile: join(siteRoot, 'app.js'),
//     write: true,
//     loader: {
//       '.css': 'local-css',
//       // '.jpg': 'file',
//       // '.png': 'file',
//     },
//     logLevel: opts.logLevel,
//     plugins: [],
//   });
// }
