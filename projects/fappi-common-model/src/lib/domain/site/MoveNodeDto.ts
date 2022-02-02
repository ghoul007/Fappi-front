import {OrgSiteNodeSlugDto} from './ids/OrgSiteNodeSlugDto';

export class MoveNodeDto {

  sourcePath: OrgSiteNodeSlugDto;
  destPath: OrgSiteNodeSlugDto;
  contextId: string;

}
