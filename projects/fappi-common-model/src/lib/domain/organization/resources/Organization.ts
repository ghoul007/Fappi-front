import {OrganizationIdDto} from './OrganizationIdDto';

export class Organization {
  defaultLanguage: string;
  description: string;
  email: string;
  faxNumber: string;
  id: OrganizationIdDto;
  name: string;
  phoneNumber: string;
  status: string;
  validationState: string;
  deleted: boolean;
}
