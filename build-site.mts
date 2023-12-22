#!/usr/bin/env node

/**
 * Handles building a site.
 *
 * Is a `bin` entry point and one of the primary APIs,
 * if not *the* primary API of this entire package.
 *
 * Depends on Node, currently.
 */

import { resolve, join, isAbsolute } from 'node:path';
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
  /** Dataset root. Absolute path. */
  datadir: string;
  /** Where to output the site. Absolute or relative to cwd. */
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

  const datadir = values.datadir
    ? isAbsolute(values.datadir)
        ? values.datadir
        : join(process.cwd(), values.datadir)
    : process.cwd();

  const buildOpts: BuildOptions = {
    datadir,
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
      throw new Error("Option --port <N> can only be given with --serve set");
    }
    await _build();
  }
}
