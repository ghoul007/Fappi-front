import {OrgElementSlugDto} from './ids/OrgElementSlugDto';

export class CreateVersionDto {
  id: OrgElementSlugDto;
  versionName: string;
  contextId: string;
}
