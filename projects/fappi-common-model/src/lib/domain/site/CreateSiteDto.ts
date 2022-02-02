import {OrgElementSlugDto} from './ids/OrgElementSlugDto';

export class CreateSiteDto {
  id: OrgElementSlugDto = new OrgElementSlugDto();
  engine: string;
  name: string;
  contextId: string;
}
