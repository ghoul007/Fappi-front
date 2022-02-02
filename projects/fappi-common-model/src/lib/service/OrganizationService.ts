import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Organization} from '../domain/organization/resources/Organization';
import {AddRootOrganizationDto} from '../domain/organization/dto/AddRootOrganizationDto';
import {OrganizationCreatedResource} from '../domain/organization/resources/OrganizationCreatedResource';
import {UpdateOrganizationInformationsDto} from '../domain/organization/dto/UpdateOrganizationInformationsDto';
import {FappiUrlService} from './FappiUrlService';
import {OrganizationIdDto} from '../domain/organization/resources/OrganizationIdDto';
import {DeleteOrganizationDto} from '../domain/organization/dto/DeleteOrganizationDto';
import {CancelDeleteOrganizationDto} from '../domain/organization/dto/CancelDeleteOrganizationDto';
import {ConfirmDeleteOrganizationDto} from '../domain/organization/dto/ConfirmDeleteOrganizationDto';


@Injectable({
  providedIn: 'root',
})
export class OrganizationService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  private baseUrl = '/organization/v1/';

  constructor(private http: HttpClient, private fappiUrlService: FappiUrlService) {
  }

  /**
   * Find all my organizations
   */
  findAll(): Observable<Organization[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}search/`, this.httpOptions)
      .pipe(
        map(a => a.body as Organization[]));
  }

  /**
   * Find all orgs (member or not)
   */
  findAllAsAdmin(showDeleted: boolean): Observable<Organization[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}search-admin/?showDeleted=${showDeleted}`, this.httpOptions)
      .pipe(
        map(a => a.body as Organization[]));
  }

  findOne(id: string): Observable<Organization> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}search/${id}`, this.httpOptions)
      .pipe(
        map(a => a.body as Organization));
  }

  addRootOrganization(addRootOrganizationDto: AddRootOrganizationDto): Observable<OrganizationCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}root-organization/?async=false`, addRootOrganizationDto, this.httpOptions)
      .pipe(
        map(a => a.body as OrganizationCreatedResource));
  }

  updateOrganization(updateOrganizationInformationsDto: UpdateOrganizationInformationsDto): Observable<void> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}organization/?async=false`, updateOrganizationInformationsDto, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }

  deleteOrganization(deleteOrganizationDto: DeleteOrganizationDto): Observable<void> {
    return this
      .http.delete(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}organization/${deleteOrganizationDto.id.id}?async=false`, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }

  confirmDeleteOrganization(confirmDeleteOrganizationDto: ConfirmDeleteOrganizationDto): Observable<void> {
    return this
      .http.delete(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}organization/${confirmDeleteOrganizationDto.id.id}/confirm-delete?async=false`, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }

  cancelDeleteOrganization(cancelDeleteOrganizationDto: CancelDeleteOrganizationDto): Observable<void> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}organization/${cancelDeleteOrganizationDto.id.id}/cancel-delete?async=false`, null, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }


  addMember(orgId: string, username: string): Observable<OrganizationCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}organization/${orgId}/add-member/${username}?async=false`, null, this.httpOptions)
      .pipe(
        map(a => a.body as OrganizationCreatedResource));
  }

  removeMember(orgId: string, username: string): Observable<OrganizationCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}organization/${orgId}/remove-member/${username}?async=false`, null, this.httpOptions)
      .pipe(
        map(a => a.body as OrganizationCreatedResource));
  }


  askForValidation(id: string) {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}organization/${id}/ask-for-validation?async=false`, null, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }
}
