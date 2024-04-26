/** Builds template’s JS. */

import { join, dirname } from 'node:path';
import { build as esbuild } from 'esbuild';

import { Console, Effect } from 'effect';
import { FileSystem } from '@effect/platform';

import { type ReportingOptions } from '../../util/index.mjs';
import { readdirRecursive } from '../../util/index.mjs';


const FILES = [
  ['index.html', 'index.html'],
  ['../../common/mathjax', 'mathjax'],
] as const;


export const distSPA = (opts: ReportingOptions & { outdir: string, packageRoot: string }) => Effect.all([
  Effect.logDebug(`Using package root: ${opts.packageRoot}`),
  Effect.tryPromise(() => buildJSForSPA(opts)),
  Console.withTime("Copy assets")(
    Effect.gen(function * (_) {
      const fs = yield * _(FileSystem.FileSystem);
      for (const [sourceRelativeFilepath, outRelativeFilepath] of FILES) {
        const stat = yield * _(fs.stat(sourceRelativeFilepath));
        if (stat.type === 'Directory') {
          const paths = yield * _(readdirRecursive(sourceRelativeFilepath));
          for (const relPath of paths) {
            yield * _(fs.copy(
              join(opts.packageRoot, sourceRelativeFilepath, relPath),
              join(opts.outdir, outRelativeFilepath, relPath),
              { overwrite: true },
            ));
          }
        } else {
          yield * _(
            fs.copy(
              join(opts.packageRoot, sourceRelativeFilepath),
              join(opts.outdir, outRelativeFilepath),
              { overwrite: true },
            ),
          );
        }
      }
    })
  ),
], { concurrency: 'unbounded' });


/**
 * Builds site template.
 *
 * Currently, that just involves running esbuild against JS.
 */
async function buildJSForSPA(opts: ReportingOptions & { outdir: string, packageRoot: string }) {
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
    tsconfig: join(opts.packageRoot, 'client-side-tsconfig.json'),
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

