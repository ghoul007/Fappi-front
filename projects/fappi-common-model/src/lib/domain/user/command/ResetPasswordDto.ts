import {UserIdDto} from './UserIdDto';

export class ResetPasswordDto {

  userId: UserIdDto;

  newPassword: string;

  temporary: boolean;
}
