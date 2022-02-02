import {Injectable} from '@angular/core';
import {ContactResource} from '../model/ContactResource';
import {Observable} from 'rxjs';
import {AddContactDto} from '../dtos/general/AddContactDto';
import {ContactOperationResultResource} from '../model/ContactOperationResultResource';
import {UpdateContactDto} from '../dtos/general/UpdateContactDto';
import {DeleteContactDto} from '../dtos/general/DeleteContactDto';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PageResource} from 'fappi-common-model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  private baseUrl = '/crm/';

  constructor(private http: HttpClient) {
  }

  findAll(orgId: string): Observable<PageResource<ContactResource>> {
    return this
      .http
      .get(`${this.baseUrl}contact/${orgId}`, this.httpOptions)
      .pipe(
        map(a => a.body as PageResource<ContactResource>));
  }

  findOne(orgId: string, contactId: string): Observable<ContactResource> {
    return this
      .http
      .get(`${this.baseUrl}contact/${orgId}/${contactId}`, this.httpOptions)
      .pipe(
        map(a => a.body as ContactResource));
  }

  addContact(addContactDto: AddContactDto): Observable<ContactOperationResultResource> {
    return this
      .http
      .post(`${this.baseUrl}contact/add`, addContactDto, this.httpOptions)
      .pipe(
        map(a => a.body as ContactOperationResultResource));
  }

  updateContact(updateContactDto: UpdateContactDto): Observable<ContactOperationResultResource> {
    return new Observable();
  }

  deleteContact(deleteContactDto: DeleteContactDto): Observable<ContactOperationResultResource> {
    return new Observable();
  }

}
