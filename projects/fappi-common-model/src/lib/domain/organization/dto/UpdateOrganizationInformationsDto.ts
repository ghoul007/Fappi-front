import {OrganizationIdDto} from '../resources/OrganizationIdDto';

export class UpdateOrganizationInformationsDto {
  constructor(
    public id: OrganizationIdDto,
    public defaultLanguage: string,
    public description: string,
    public email: string,
    public faxNumber: string,
    public phoneNumber: string) {
  }
}
