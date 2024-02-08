/**
 * Packages itself (site-builder).
 *
 * Used in development/release flow, used by package.json scripts.
 *
 * Depends on Node.
 */

import { resolve, join } from 'node:path';

import { Logger, Effect } from 'effect';
import { NodeContext, Runtime } from '@effect/platform-node';
import { Command } from '@effect/cli';
import { build as esbuild } from 'esbuild';

import {
  type ReportingOptions,
  parseReportingConfig,
  reportingOptions,
  EFFECT_LOG_LEVELS,
} from './util/index.mjs';
//import { ContribSiteTemplateName, CONTRIB_SITE_TEMPLATES } from './site/index.mjs';


const PACKAGE_ROOT = resolve(join(import.meta.url.split('file://')[1]!, '..'));


const preparePackage = Command.make('package', reportingOptions, (rawOpts) =>
  Effect.gen(function * (_) {
    const opts = yield * _(Effect.try(() => parseReportingConfig(rawOpts)));
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
  })
);

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


/**
 * Builds the entry point for site build CLI command.
 *
 * NOTE: It bundles all deps into that file.
 * That may be suboptimal, since it results in a >1MB size .js script.
 * However, it makes NPX invocation faster since we have no runtime
 * dependencies, only devDependencies. Also, I couldn’t figure out
 * how to properly import runtime dependencies from a packace.json’s bin.
 */
async function buildSiteBuilder(opts: ReportingOptions) {
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
