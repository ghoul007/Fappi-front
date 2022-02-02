import {OrgSiteNodeSlugDto} from './ids/OrgSiteNodeSlugDto';
import {NodeTypeIdentifierDto} from './NodeTypeIdentifierDto';

export class NodeResource {
  id: OrgSiteNodeSlugDto;
  name: string;
  nodeType: NodeTypeIdentifierDto;
  properties: any;
  meta: any;
  folder: boolean;
  lastModified: number;
  modifiedBy: string;
  createdBy: string;
}
