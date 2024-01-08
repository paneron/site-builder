import * as S from '@effect/schema/Schema';


export const DatasetSchema = S.record(S.string, S.record(S.string, S.unknown));
export type Dataset = Record<string, Record<string, unknown>>;
