import {Observable} from 'rxjs';
import {CustomTypeResource} from '../domain/site/CustomTypeResource';
import {UpdateCustomTypeDto} from '../domain/site/UpdateCustomTypeDto';
import {AddCustomTypeDto} from '../domain/site/AddCustomTypeDto';
import {NodeTypeIdentifierDto} from '../domain/site/NodeTypeIdentifierDto';

//TODO make this service standalone in component.
export interface CustomFieldService {
  findOneNodeType(orgId: string, nodeType: NodeTypeIdentifierDto): Observable<CustomTypeResource>;

  updateNodeType(nodeTypeDto: UpdateCustomTypeDto): Observable<any>;

  addNodeType(nodeTypeDto: AddCustomTypeDto): Observable<any>;
}
