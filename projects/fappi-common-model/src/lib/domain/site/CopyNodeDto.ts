import {OrgSiteNodeSlugDto} from './ids/OrgSiteNodeSlugDto';

export class CopyNodeDto {

  sourcePath: OrgSiteNodeSlugDto;
  destPath: OrgSiteNodeSlugDto;
  contextId: string;

}
