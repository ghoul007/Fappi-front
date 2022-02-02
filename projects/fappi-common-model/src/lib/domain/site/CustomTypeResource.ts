import {CustomTypeField} from './CustomTypeField';
import {NodeTypeIdentifierDto} from './NodeTypeIdentifierDto';
import {CustomTypeVisibility} from './CustomTypeVisibility';

export class CustomTypeResource {
  id: NodeTypeIdentifierDto;
  name: string;
  customTypeFields: CustomTypeField[];
  visibility: CustomTypeVisibility;
}

