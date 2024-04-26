import * as S from '@effect/schema/Schema';


export const DatasetSchema = S.Record(S.String, S.Record(S.String, S.Unknown));
//export const ManifestSchema = S.record(S.string, S.string);


export const ManifestSchema = S.Struct({
  dataVersion: S.optional(S.Union(S.String.pipe(S.nonEmpty()), S.Undefined)),

  // TODO: Should go away at some point.
  forUsername: S.optional(S.Union(S.String.pipe(S.nonEmpty()), S.Undefined)),
});

export type Dataset = Record<string, Record<string, unknown>>;
