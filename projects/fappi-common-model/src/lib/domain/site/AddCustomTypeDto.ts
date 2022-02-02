import {NodeTypeIdentifierDto} from './NodeTypeIdentifierDto';

export class AddCustomTypeDto {
  id: NodeTypeIdentifierDto;
  name: string;
  contextId: string;
}
