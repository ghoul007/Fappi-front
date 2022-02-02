import {UserId} from '../domain/UserId';
import {OrganizationIdDto} from '../../organization/resources/OrganizationIdDto';

export class AddUserDto {
  userId: UserId;
  organizationId: OrganizationIdDto;
  password: string;
  preferredEmail: string;
  temporaryPassword = false;
}
