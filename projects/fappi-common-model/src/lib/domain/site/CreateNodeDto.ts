import {OrgSiteNodeSlugDto} from './ids/OrgSiteNodeSlugDto';
import {NodeTypeIdentifierDto} from './NodeTypeIdentifierDto';

export class CreateNodeDto {
  nodeSiteSlug = new OrgSiteNodeSlugDto();
  nodeType: NodeTypeIdentifierDto;
  name: string;
  properties: any;
  contextId: string;
}
