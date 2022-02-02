import {OrgSiteNodeSlugDto} from 'fappi-common-model';

export class CreateCommentDto {
  orgSiteNodeSlugDto: OrgSiteNodeSlugDto;
  content: string;
  contextId: string;
}
