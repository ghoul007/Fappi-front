import {EventEmitter, Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {concatMap, defaultIfEmpty, filter, flatMap, map, tap, toArray} from 'rxjs/operators';
import {UserInfoResource} from '../domain/user-info/UserInfoResource';
import {FappiUrlService} from './FappiUrlService';


/**
 * Provide user infos
 */
@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  // Roles are set as: ORG_ID:ROLE
  private userRoles: Set<string>;
  // Groups are set as the full path of the group (/orgId/groupId
  private userGroups: Set<string>;

  constructor(private http: HttpClient, private fappiUrlService: FappiUrlService) {
  }

  /**
   * when the user is detected "logged out"
   */
  private _loggedOut: EventEmitter<any> = new EventEmitter<any>();

  set loggedOut(value: EventEmitter<any>) {
    this._loggedOut = value;
  }

  infos(): Observable<UserInfoResource> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}/user-info`, this.httpOptions)
      .pipe(
        map(a => a.body as UserInfoResource));
  }

  /**
   * Set the current lang of the user in session.
   */
  setLanguageInSession(lang): Observable<UserInfoResource> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}/set-current-language?lang=${lang}`, this.httpOptions)
      .pipe(
        map(a => a.body as UserInfoResource));
  }

  logout(): Observable<any> {
    return this
      .http
      .post(`${this.fappiUrlService.apiBaseUrl}/logout`, this.httpOptions)
      .pipe(
        map(a => {
          return a;
        }));
  }

  hasRole(roles: string[]): Observable<boolean> {
      return this.infos().pipe(
        map((user: UserInfoResource) => {
          let verified = false;
          let roleList = user.principal?.claims?.authorities;
          if (!roleList) {
            roleList =  user.principal?.attributes?.authorities;
          }
          if (!roleList) {
            console.log('Error getting roles from the token (current-user api)');
            roleList = [];
          }
          for (const authorities of roleList) {
            if (authorities) {
                if (roles.indexOf(authorities) < 0) {
                } else {
                  verified = true;
                }
            }
          }
          return verified;
        }),
      );
  }

  hasGroup(orgId: string, groups: string[], anyMatch = false): Observable<boolean> {
      return this.infos().pipe(
        flatMap(user => {
          for (const authority of user.authorities) {
            if (authority.attributes.membership) {
              return (authority.attributes.membership as string[]);
            }
          }
          return [];
        }),
        map((m) => (m as string).split('/')[2]),
        concatMap(value => of(value)),
        toArray(),
        map((rs: string[]) => {
          let matchCount = 0;
          for (const g of groups) {
            if (rs.indexOf(g) >= 0) {
              matchCount++;
            } else if (!anyMatch) {
              return false;
            }
          }
          return matchCount > 0;
        })
      );
  }

  hasAnyRole(roles: string[]): Observable<boolean> {
      return this.infos().pipe(
        // roles can come from multiple attributes, depends on the oauth2 server configuration:
        map(user => {
          let roleList = user.principal?.claims?.authorities;
          if (!roleList) {
            roleList =  user.principal?.attributes?.authorities;
          }
          if (!roleList) {
            return [];
          }
          return roleList;
        }),
        map((rs: string[]) => {
          for (const r of rs) {
            if (roles.indexOf(r) >= 0) {
              return true;
            }
          }
          return false;
        })
      );
  }


}
