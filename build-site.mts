#!/usr/bin/env node

import { resolve, join } from 'node:path';
import { mkdir, access, constants, cp } from 'node:fs/promises';
import { parseArgs } from 'node:util';

import { type BaseBuildOptions, makeSequential, watchAndCall, serve, noop } from './util/index.mjs';

console.debug("HI");

// We will need to access this package’s source when building the site:
const PACKAGE_ROOT = resolve(join(import.meta.url.split('file://')[1]!, '..'));

console.debug("My source is at (f)", PACKAGE_ROOT);

/** Site source files (pre-packaged for the browser). */
const SITE_ROOT = join(PACKAGE_ROOT, 'site');

console.info("HEY");



interface BuildOptions extends BaseBuildOptions {
  /** Dataset root. */
  datadir: string;
  /** Where to output the site. */
  outdir: string;
}


async function build(opts: BuildOptions) {
  await cp(SITE_ROOT, opts.outdir, { recursive: true });
}


await main();


/** Entry point when invoked as CLI script. */
async function main() {

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

  const buildOpts: BuildOptions = {
    datadir: values.datadir ?? process.cwd(),
    outdir: values.outdir,
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
      await serve(
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
      throw new Error("--port requires --serve");
    }
    await _build();
  }
}
