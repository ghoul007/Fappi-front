import {OrgSiteNodeSlugDto} from './ids/OrgSiteNodeSlugDto';

export class DeleteNodeDto {
  nodeSiteSlug: OrgSiteNodeSlugDto = new OrgSiteNodeSlugDto();
  contextId: string;
}
