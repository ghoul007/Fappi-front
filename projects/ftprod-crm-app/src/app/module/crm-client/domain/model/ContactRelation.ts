import {ContactRelationType} from './ContactRelationType';
import {ContactId} from './ContactId';

export class ContactRelation {
  id: string;
  type: ContactRelationType;
  description: string;
  sourceContact: ContactId;
  destinationContact: ContactId;
}
