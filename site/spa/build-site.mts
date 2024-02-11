import { pipe, Effect } from 'effect';
import { type SiteBuildOptions } from '../../util/index.mjs';
import { readdirRecursive } from '../../util/index.mjs';


export const buildSite =
(opts: SiteBuildOptions & { outdir: string, packageRoot: string }) =>
  Effect.all([
    Effect.logDebug(`What’s up, ${opts.outdir} ${opts.packageRoot}`),
    pipe(
      readdirRecursive(opts.datadir),
      Effect.andThen(dirs => Effect.logDebug(`${JSON.stringify(dirs)}`)),
    ),
  ]);
