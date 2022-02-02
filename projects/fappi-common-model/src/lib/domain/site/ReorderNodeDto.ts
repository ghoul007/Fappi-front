import {OrgSiteNodeSlugDto} from './ids/OrgSiteNodeSlugDto';

export class ReorderNodeDto {

  sourcePath: OrgSiteNodeSlugDto;
  destPath: OrgSiteNodeSlugDto;
  contextId: string;

}
