import * as S from '@effect/schema/Schema';


export const PaneronDataset = S.struct({
  title: S.string,
  type: S.struct({
    id: S.string.pipe(
      S.nonEmpty(),
      S.trimmed(),
      // Disallow trailing slashes
      S.filter(s => !s.startsWith('/')),
      S.filter(s => !s.endsWith('/')),
    ),
    version: S.string,
  }),
});


export const RegisterItem = S.struct({
  id: S.UUID,
  data: S.record(S.string, S.unknown),
  dateAccepted: S.Date,
  status: S.literal('submitted', 'valid', 'superseded', 'retired', 'invalid'),
});


export function getExtensionURL(extID: S.Schema.To<typeof PaneronDataset>['type']['id']): string {
  return `https://extensions.paneron.org/e/${extID}/build.js`;
}
