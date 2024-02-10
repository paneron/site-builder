/** Builds template’s JS. */

import { join } from 'node:path';
import { build as esbuild } from 'esbuild';

import { Console, Effect } from 'effect';
import { FileSystem } from '@effect/platform-node';

import { type SiteBuildOptions } from '../../util/index.mjs';


const FILES = [
  ['index.html', 'index.html'],
  ['../../common/mathjax/MathJax.js', 'mathjax/MathJax.js'],
  ['../../common/mathjax/config/AM_HTMLorMML.js', 'mathjax/config/AM_HTMLorMML.js'],
  ['../../common/mathjax/extensions/MathMenu.js', 'mathjax/extensions/MathMenu.js'],
  ['../../common/mathjax/extensions/MathZoom.js', 'mathjax/extensions/MathZoom.js'],
] as const;


export const distSPA = (opts: SiteBuildOptions) => Effect.all([
  Effect.logDebug(`Using package root: ${opts.packageRoot}`),
  Effect.tryPromise(() => buildJSForSPA(opts)),
  Console.withTime("Copy assets")(
    Effect.gen(function * (_) {
      const fs = yield * _(FileSystem.FileSystem);
      for (const [sourceRelativeFilepath, outRelativeFilepath] of FILES) {
        yield * _(
          fs.copy(
            join(opts.packageRoot, sourceRelativeFilepath),
            join(opts.outdir, outRelativeFilepath),
            { overwrite: true },
          ),
        );
      }
    })
  ),
], { concurrency: 'unbounded' });


/**
 * Builds site template.
 *
 * Currently, that just involves running esbuild against JS.
 */
async function buildJSForSPA(opts: SiteBuildOptions) {
  //const siteRoot = join(opts.packageRoot, 'site', opts.templateName);
  //const siteRoot = join(opts.packageRoot, 'site-app');
  return await esbuild({
    entryPoints: [
      join(opts.packageRoot, 'index.tsx'),
      join(opts.packageRoot, 'loader.ts'),
      //join(opts.packageRoot, 'imports.mts'),
      //join(opts.packageRoot, 'site', 'index.tsx'),
    ],
    entryNames: '[dir]/[name]',
    assetNames: '[dir]/[name]',
    tsconfig: join(opts.packageRoot, 'tsconfig.json'),
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
    outdir: join(opts.packageRoot, 'dist'),
    //outdir: opts.packageRoot,
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

