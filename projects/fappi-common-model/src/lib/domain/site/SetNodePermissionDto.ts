import {OrgSiteNodeSlugDto} from './ids/OrgSiteNodeSlugDto';
import {GroupId} from '../user/domain/GroupId';

export class SetNodePermissionDto {

  nodeSiteSlug: OrgSiteNodeSlugDto;

  groupIds: GroupId[];

  scopes: string[];

  contextId: string;

}
