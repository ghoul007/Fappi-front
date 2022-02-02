import {OrgSiteNodeSlugDto} from 'fappi-common-model';

export class CommentResource {
  orgSiteNodeSlugDto: OrgSiteNodeSlugDto;
  uuid: string;
  content: string;
  lastModified: Date;
  author: string;
}
