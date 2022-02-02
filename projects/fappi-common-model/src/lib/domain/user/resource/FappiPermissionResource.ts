import {GroupId} from '../domain/GroupId';

export class FappiPermissionResource {
  name: string;
  scopes: string[];
  groupIds: GroupId[];
}
