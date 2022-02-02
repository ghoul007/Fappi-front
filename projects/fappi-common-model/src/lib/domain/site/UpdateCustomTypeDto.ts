import {CustomTypeField} from './CustomTypeField';
import {NodeTypeIdentifierDto} from './NodeTypeIdentifierDto';
import {CustomTypeVisibility} from './CustomTypeVisibility';

export class UpdateCustomTypeDto {
  id: NodeTypeIdentifierDto;
  customTypeFields: CustomTypeField[] = [];
  name: string;
  visibility: CustomTypeVisibility;
  contextId: string;
}
