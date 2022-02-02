import {OrganizationIdDto} from '../resources/OrganizationIdDto';

export class AddRootOrganizationDto {
  constructor(public name: string, public id: OrganizationIdDto, public skipAddAdminUser: boolean = false) {
  }
}
