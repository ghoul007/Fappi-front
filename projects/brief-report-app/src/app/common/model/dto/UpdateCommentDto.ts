import {OrgSiteNodeSlugDto} from 'fappi-common-model/lib/domain/site/ids/OrgSiteNodeSlugDto';

export class UpdateCommentDto {
  orgSiteNodeSlugDto: OrgSiteNodeSlugDto;
  uuid: string;
  content: string;
  contextId: string;
}
