import {ContactType} from '../../model/ContactType';

export class CreateContactDto {
  firstname: string;
  lastname: string;
  type: ContactType;

}
