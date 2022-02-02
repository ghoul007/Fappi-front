import {MemberId} from '../../domain/MemberId';
import {GroupId} from '../../domain/GroupId';

export class RemoveMemberDto {
  groupId: GroupId;
  memberId: MemberId;
}
