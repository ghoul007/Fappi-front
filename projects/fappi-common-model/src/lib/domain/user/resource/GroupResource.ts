import {GroupId} from '../domain/GroupId';

export class GroupResource {
  groupId: GroupId;
  name: string;
  protectedGroup: boolean;
  deleted: boolean;
}
