import * as S from '@effect/schema/Schema';


export const DatasetSchema = S.record(S.string, S.record(S.string, S.unknown));
//export const ManifestSchema = S.record(S.string, S.string);


export const ManifestSchema = S.struct({
  dataVersion: S.optional(S.union(S.string.pipe(S.nonEmpty()), S.undefined)),

  // TODO: Should go away at some point.
  forUsername: S.optional(S.union(S.string.pipe(S.nonEmpty()), S.undefined)),
});

export type Dataset = Record<string, Record<string, unknown>>;
