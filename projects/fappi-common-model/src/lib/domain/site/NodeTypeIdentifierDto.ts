import {OrgElementSlugDto} from './ids/OrgElementSlugDto';

export class NodeTypeIdentifierDto {
  id: OrgElementSlugDto = new OrgElementSlugDto();
  slug: string;
  contextId: string;
}
