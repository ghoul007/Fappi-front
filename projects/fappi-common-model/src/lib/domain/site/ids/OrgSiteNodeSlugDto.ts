import {NodeSlug} from './NodeSlug';

export class OrgSiteNodeSlugDto {
  constructor(
    public organizationId?: string,
    public elementId?: string,
    public nodeSlug = new NodeSlug()
  ) {
  }
}
