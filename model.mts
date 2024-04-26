import * as S from '@effect/schema/Schema';


export const PaneronDataset = S.Struct({
  title: S.String,
  type: S.Struct({
    id: S.String.pipe(
      S.nonEmpty(),
      S.trimmed(),
      // Disallow trailing slashes
      S.filter(s => !s.startsWith('/')),
      S.filter(s => !s.endsWith('/')),
    ),
    version: S.String,
  }),
});


// TODO: Shouldn’t be here, really. The goal is register-independent
export const RegisterItem = S.Struct({
  id: S.UUID,
  data: S.Record(S.String, S.Unknown),
  dateAccepted: S.Date,
  status: S.Literal('submitted', 'valid', 'superseded', 'retired', 'invalid'),
});


export function getExtensionURLs(extID: S.Schema.Type<typeof PaneronDataset>['type']['id'], rootOverride?: string) {
  const root = rootOverride ?? `https://extensions.paneron.org/e/${extID}`;
  return {
    esbuiltSource: `${root}/extension.js`,
    packageJson:  `${root}/package.json`,
  };
}

export function getExtensionURL(extID: S.Schema.Type<typeof PaneronDataset>['type']['id']): string {
  return `https://extensions.paneron.org/e/${extID}/build.js`;
}
