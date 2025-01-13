import { pipe, Effect } from 'effect';
import { type SiteBuilder, readdirRecursive } from '../../util/index.mjs';


export const buildSite: SiteBuilder = (opts) =>
  Effect.all([
    Effect.logDebug(`What’s up, ${opts.outdir} ${opts.packageRoot}`),
    pipe(
      readdirRecursive(opts.datadir),
      //Effect.andThen(dirs =>
      //  Effect.logDebug(`First 10 dir entries: ${JSON.stringify(dirs.slice(0, 10))}`)
      //),
      // (asdf) => console.log('site/spa/build-site: what is opts', opts, asdf)
    ),
    Effect.sync(() => console.log('site/spa/build-site: what is opts', opts)),
  ]);
// Effect.Effect<readonly string[], PlatformError, FileSystem.FileSystem> =>
// Effect.gen(function * (_) {
