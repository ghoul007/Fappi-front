import {OrgSiteNodeSlugDto} from './ids/OrgSiteNodeSlugDto';

export class SetNodeMetaDto {
  nodeSiteSlug: OrgSiteNodeSlugDto = new OrgSiteNodeSlugDto();
  properties: any;
  patch: boolean;
  contextId: string;
}
