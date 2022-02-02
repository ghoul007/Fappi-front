import {GroupId} from '../../domain/GroupId';
import {MemberId} from '../../domain/MemberId';

export class AddMemberDto {
  groupId: GroupId;
  memberId: MemberId;
}
