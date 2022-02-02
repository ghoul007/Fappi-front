import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GroupResource} from '../domain/user/resource/GroupResource';
import {GroupCreatedResource} from '../domain/user/resource/GroupCreatedResource';
import {AddGroupDto} from '../domain/user/command/group/AddGroupDto';
import {RemoveMemberDto} from '../domain/user/command/group/RemoveMemberDto';
import {AddMemberDto} from '../domain/user/command/group/AddMemberDto';
import {Injectable} from '@angular/core';
import {DeleteGroupDto} from '../domain/user/command/group/DeleteGroupDto';
import {UpdateGroupDto} from '../domain/user/command/group/UpdateGroupDto';
import {UserResource} from '../domain/user/resource/UserResource';
import {FappiPermissionResource} from '../domain/user/resource/FappiPermissionResource';
import {FappiUrlService} from './FappiUrlService';
import {ConfirmDeleteGroupDto} from '../domain/user/command/group/ConfirmDeleteGroupDto';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  private baseUrl = '/user/v1/admin-groups/';
  private baseUrlQuery = '/user/v1/groups/';
  private baseUrlQueryMembers = '/user/v1/groups-members/';

  constructor(private http: HttpClient, private fappiUrlService: FappiUrlService) {
  }

  findAllByOrganization(organizationId: string, showDeleted: boolean = false): Observable<GroupResource[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlQuery}${organizationId}/?showDeleted=${showDeleted}`, this.httpOptions)
      .pipe(
        map(a => a.body as GroupResource[]));
  }

  findOne(organizationId: string, id: string): Observable<GroupResource> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlQuery}${organizationId}/${id}`, this.httpOptions)
      .pipe(
        map(a => a.body as GroupResource));
  }

  findMembers(organizationId: string, id: string): Observable<UserResource[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlQueryMembers}${organizationId}/${id}`, this.httpOptions)
      .pipe(
        map(a => a.body as UserResource[]));
  }

  addGroup(group: AddGroupDto): Observable<GroupCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}add?async=false`, group, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as GroupCreatedResource;
        }));
  }

  addGroupProtected(group: AddGroupDto): Observable<GroupCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}add-protected?async=false`, group, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as GroupCreatedResource;
        }));
  }


  addMember(addMemberDto: AddMemberDto): Observable<GroupCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}add-member?async=false`, addMemberDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as GroupCreatedResource;
        }));
  }


  addMemberProtected(addMemberDto: AddMemberDto): Observable<GroupCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}add-member-protected?async=false`, addMemberDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as GroupCreatedResource;
        }));
  }

  removeMember(removeMemberDto: RemoveMemberDto): Observable<GroupCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}remove-member?async=false`, removeMemberDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as GroupCreatedResource;
        }));
  }

  removeMemberProtected(removeMemberDto: RemoveMemberDto): Observable<GroupCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}remove-member-protected?async=false`, removeMemberDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as GroupCreatedResource;
        }));
  }

  deleteGroup(deleteGroupDto: DeleteGroupDto): Observable<GroupCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}delete?async=false`, deleteGroupDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as GroupCreatedResource;
        }));
  }

  deleteGroupProtected(deleteGroupDto: DeleteGroupDto): Observable<GroupCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}delete-protected?async=false`, deleteGroupDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as GroupCreatedResource;
        }));
  }


  confirmDeleteGroup(confirmDeleteGroupDto: ConfirmDeleteGroupDto): Observable<GroupCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}confirm-delete?async=false`, confirmDeleteGroupDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as GroupCreatedResource;
        }));
  }

  confirmDeleteGroupProtected(confirmDeleteGroupDto: ConfirmDeleteGroupDto): Observable<GroupCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}confirm-delete-protected?async=false`,
        confirmDeleteGroupDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as GroupCreatedResource;
        }));
  }

  updateGroup(updateGroupDto: UpdateGroupDto): Observable<GroupCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}update?async=false`, updateGroupDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as GroupCreatedResource;
        }));
  }

  updateGroupProtected(updateGroupDto: UpdateGroupDto): Observable<GroupCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}update-protected?async=false`, updateGroupDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as GroupCreatedResource;
        }));
  }


  findPermissionsByUrl(url: string, start?: 0, max?: 20): Observable<FappiPermissionResource[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}/cms/permissions/org1/search-by-name/${encodeURI(url)}`, this.httpOptions)
      .pipe(
        map(a => a.body as FappiPermissionResource []));
  }

}
