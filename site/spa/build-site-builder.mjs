// build-site-builder.mts
import { resolve, join } from "node:path";
import { Logger, Effect as Effect2 } from "effect";
import { NodeContext, Runtime } from "@effect/platform-node";
import { Command } from "@effect/cli";
import { build as esbuild } from "esbuild";

// ../../util/index.mts
import { pipe, Effect, Option, LogLevel as EffectLogLevel } from "effect";
import { FileSystem } from "@effect/platform-node";
import { Options } from "@effect/cli";
import * as S2 from "@effect/schema/Schema";

// ../index.mts
import * as S from "@effect/schema/Schema";
var CONTRIB_SITE_TEMPLATES = Object.freeze([
  "spa"
  // 'isogr2013', TODO: implement ISO GR static build
]);
var ContribSiteTemplateName = S.literal(...CONTRIB_SITE_TEMPLATES);

// ../../util/index.mts
var LogLevelSchema = S2.literal("debug", "info", "error", "silent");
var EFFECT_LOG_LEVELS = {
  "debug": EffectLogLevel.Debug,
  "info": EffectLogLevel.Info,
  "error": EffectLogLevel.Error,
  "silent": EffectLogLevel.None
};
var ReportingConfigSchema = S2.struct({
  logLevel: LogLevelSchema
});
var reportingOptions = {
  verbose: Options.boolean("verbose").pipe(Options.withAlias("v")),
  debug: Options.boolean("debug")
};
function parseReportingConfig(values) {
  return S2.parseSync(ReportingConfigSchema)({
    logLevel: values.debug ? "debug" : values.verbose ? "info" : "error"
  });
}
var DatasetBuildConfigSchema = S2.struct({
  datadir: S2.string.pipe(S2.nonEmpty())
});
var datasetBuildOptions = {
  datadir: Options.directory("datadir", { exists: "yes" }).pipe(
    Options.optional
  )
};
var siteBuildOptions = {
  outdir: Options.directory("outdir"),
  forUsername: Options.text("forusername").pipe(Options.optional),
  // TODO: instead of passing --dataversion, calculate it based on datadir state?
  dataVersion: Options.text("dataversion").pipe(Options.optional),
  siteTemplateName: Options.choice("template", CONTRIB_SITE_TEMPLATES).pipe(
    Options.withDefault(CONTRIB_SITE_TEMPLATES[0])
  ),
  ...reportingOptions,
  ...datasetBuildOptions
};
var SiteBuildConfigSchema = S2.struct({
  outdir: S2.string.pipe(S2.nonEmpty()),
  dataVersion: S2.optional(S2.string.pipe(S2.nonEmpty())),
  forUsername: S2.optional(S2.string.pipe(S2.nonEmpty())),
  siteTemplatePath: S2.string.pipe(S2.nonEmpty())
}).pipe(
  S2.extend(ReportingConfigSchema),
  S2.extend(DatasetBuildConfigSchema)
);

// build-site-builder.mts
var PACKAGE_ROOT = resolve(join(import.meta.url.split("file://")[1], ".."));
var preparePackage = Command.make(
  "package",
  reportingOptions,
  (rawOpts) => Effect2.gen(function* (_) {
    const opts = yield* _(Effect2.try(() => parseReportingConfig(rawOpts)));
    yield* _(
      Effect2.all([
        Effect2.logDebug(`Using package root: ${PACKAGE_ROOT}`),
        Effect2.tryPromise(() => buildSiteBuilder(opts))
      ], { concurrency: "unbounded" }),
      Effect2.tap(Effect2.logDebug("Done building.")),
      Logger.withMinimumLogLevel(EFFECT_LOG_LEVELS[opts.logLevel])
    );
  })
);
var main = Command.run(
  preparePackage,
  {
    name: "Site builder builder (internal script)",
    version: "N/A"
  }
);
Effect2.suspend(() => main(process.argv.slice(2))).pipe(
  Effect2.provide(NodeContext.layer),
  Runtime.runMain
);
async function buildSiteBuilder(opts) {
  const { logLevel } = opts;
  return await esbuild({
    entryPoints: [
      join(PACKAGE_ROOT, "build-site-core.mts")
      //join(PACKAGE_ROOT, 'site', 'index.tsx'),
    ],
    entryNames: "[dir]/[name]",
    assetNames: "[dir]/[name]",
    format: "esm",
    target: ["esnext"],
    bundle: true,
    // We cannot make dependencies external, because
    // package’s bin scripts don’t seem to have access
    // to package dependencies.
    //external: ['react', 'react-dom', '@effect/*', 'effect'],
    minify: false,
    treeShaking: true,
    sourcemap: false,
    platform: "node",
    //publicPath: 'https://convertor.glossarist.org/',
    outfile: "build-site.mjs",
    // The hope was that this could allow to call esbuild in bundled site builder,
    // but apparently esbuild can’t bundle itself.
    // banner: {
    //   js: `
    //     import { fileURLToPath } from 'node:url';
    //     import { dirname } from 'node:path';
    //     import { createRequire as topLevelCreateRequire } from 'node:module';
    //     const require = topLevelCreateRequire(import.meta.url);
    //     const __filename = fileURLToPath(import.meta.url);
    //     const __dirname = dirname(__filename);
    //   `,
    // },
    write: true,
    loader: {
      ".css": "local-css"
      // '.jpg': 'file',
      // '.png': 'file',
    },
    logLevel,
    plugins: []
  });
}
