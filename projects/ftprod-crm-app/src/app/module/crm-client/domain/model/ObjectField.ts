import {ObjectFieldId} from './ObjectFieldId';
import {ValidatorId} from './ValidatorId';

export class ObjectField {
  id: ObjectFieldId;
  label: string;
  validators: ValidatorId[];
  tooltip: string;
  helper: string;

}
