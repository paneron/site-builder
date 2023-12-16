import { resolve, join } from 'node:path';
import { parseArgs } from 'node:util';

import { build as esbuild } from 'esbuild';

import { type BaseBuildOptions, noop, isCLI } from './util/index.mjs';


// NOTE: this assumes the script is called via `yarn workspace webgui build`,
// so that `.` corresponds to webgui package root.
const PACKAGE_ROOT = resolve(join(import.meta.url.split('file://')[1]!, '..'));
//const SITE_ROOT = join(PACKAGE_ROOT, 'site');

console.debug("package root", PACKAGE_ROOT);


/** Entry point when invoked as CLI script. */
async function main() {
  const { values } = parseArgs({
    options: {
      debug: { type: 'boolean' },
      verbose: { type: 'boolean' },
    },
  });

  const buildOpts: BaseBuildOptions = {
    logLevel:
      values.debug
        ? 'debug'
        : values.verbose
            ? 'info'
            : 'error',
  };

  // Monkey-patch console into desired log level :/
  if (!values.debug) {
    console.debug = noop;
    if (!values.verbose) {
      console.log = noop;
      // info is considered higher level than log, and will be output
    }
  }

  await buildSiteBuilder(buildOpts);

  // const _build = makeSequential(async function buildCLI() {
  //   return await build(buildOpts);
  // });

  // if (values.serve) {
  //   const port = parseInt(values.port ?? '8080', 10);
  //   const ac = new AbortController();
  //   function abortServe() { ac.abort(); }
  //   process.on('SIGINT', abortServe);
  //   try {
  //     await _build();
  //     await serve(
  //       buildOpts.distdir,
  //       port,
  //       ac.signal);
  //     await watchAndCall(
  //       REPO_ROOT,
  //       [buildOpts.pubdir, buildOpts.srcdir, ...(values.watch ?? [])],
  //       [],
  //       _build,
  //       ac.signal);
  //   } catch (e) {
  //     abortServe();
  //     throw e;
  //   }
  // } else {
  //   if (values.port) {
  //     throw new Error("--port requires --serve");
  //   }
  //   await _build();
  // }
}


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
    //external: ['react', 'react-dom'],
    minify: false,
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


if (isCLI()) {
  await main();
}
