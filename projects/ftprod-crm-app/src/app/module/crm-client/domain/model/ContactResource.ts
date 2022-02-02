import {ContactId} from './ContactId';
import {GenderId} from './GenderId';
import {EmailResource} from './EmailResource';
import {AddressResource} from './AddressResource';
import {ContactRelation} from './ContactRelation';

export class ContactResource {

  id: ContactId;
  firstname: string;
  lastname: string;
  title: string;
  phone: string;

  dayOfBirth: number;
  monthOfBirth: number;
  yearOfBirth: number;
  age: number;

  emails: EmailResource[];
  gender: GenderId;
  addresses: AddressResource[];
  contactRelations: ContactRelation[];


}
