import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {RoleResource} from '../domain/user/resource/RoleResource';
import {FappiUrlService} from './FappiUrlService';


@Injectable({
  providedIn: 'root',
})

export class RoleService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  private baseUrl = '/user/v1/roles/';
  private baseAdminUrl = '/user/v1/admin/roles/';

  constructor(private http: HttpClient, private fappiUrlService: FappiUrlService) {
  }

  findAll(): Observable<RoleResource[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}`, this.httpOptions)
      .pipe(
        map(a => a.body as RoleResource[]));
  }

  findRolesOf(refererId: string): Observable<RoleResource[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}user/${refererId}`, this.httpOptions)
      .pipe(
        map(a => a.body as RoleResource[]));
  }

  saveRolesOf(refererId: string, roles: any) { // TODO type roles
    return this
      .http
      .post(`${this.fappiUrlService.apiBaseUrl}${this.baseAdminUrl}user/${refererId}`, roles, this.httpOptions)
      .pipe(
        map(a => a.body as RoleResource[]));
  }

}

