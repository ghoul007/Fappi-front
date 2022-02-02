import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AddCustomTypeDto, CustomFieldService, CustomTypeResource, NodeTypeIdentifierDto, UpdateCustomTypeDto} from 'fappi-common-model';

@Injectable({
  providedIn: 'root',
})
export class CrmCustomFieldsService implements CustomFieldService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  private baseUrlNodeType = '/crm/v1/node-type';

  constructor(private http: HttpClient) {
  }

  findOneNodeType(orgId: string, nodeType: NodeTypeIdentifierDto): Observable<CustomTypeResource> {
    return this
      .http
      .get(`${this.baseUrlNodeType}/${orgId}/${nodeType.id.elementId}/${nodeType.slug}`, this.httpOptions)
      .pipe(
        map(a => a.body as CustomTypeResource));

  }


  addNodeType(nodeTypeDto: AddCustomTypeDto): Observable<any> {//FIXME type the return
    return this
      .http.post(`${this.baseUrlNodeType}/`, nodeTypeDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as any;
        }));
  }

  updateNodeType(nodeTypeDto: UpdateCustomTypeDto): Observable<any> {//FIXME type the return
    return this
      .http.put(`${this.baseUrlNodeType}/`, nodeTypeDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as any;
        }));
  }

}
