import * as S from '@effect/schema/Schema';


/**
 * NOTE: Every item in this array must correspond to a valid
 * subdirectory here.
 */
export const CONTRIB_SITE_TEMPLATES = Object.freeze(['geodetic-registry-2013'] as const);

/**
 * Site template name. A template determines how the built website looks.
 */
export const ContribSiteTemplateName = S.literal(...CONTRIB_SITE_TEMPLATES);
