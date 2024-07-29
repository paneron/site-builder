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
    ),
  ]);
