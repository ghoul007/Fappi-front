import {OrgSiteNodeSlugDto} from './ids/OrgSiteNodeSlugDto';

export class UpdateNodeContentDto {
  nodeSiteSlug: OrgSiteNodeSlugDto = new OrgSiteNodeSlugDto();
  properties: any;
  name: string;
  patch = false;
  channelId: string;
  contextId: string;
}
