import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuditContextResource} from '../domain/audit/AuditContextResource';
import {PageResource} from '../domain/PageResource';
import {FappiUrlService} from './FappiUrlService';

@Injectable({
  providedIn: 'root',
})
export class AuditService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  private baseUrl = '/audit/audit/search/';

  constructor(private http: HttpClient, private fappiUrlService: FappiUrlService) {
  }

  findAllByOrganization(organizationId: string, filers: any, sortDirection, pageIndex,
                        pageSize): Observable<PageResource<AuditContextResource>> {
    let urlService = `${this.fappiUrlService.apiBaseUrl}${this.baseUrl}?orgId=${organizationId}&start=${pageIndex}&size=${pageSize}`;

    if (filers && filers.username !== '') {
      urlService = `${urlService}&username=${filers.username}`;
    }
    if (filers && filers.ip !== '') {
      urlService = `${urlService}&ip=${filers.ip}`;
    }
    if (filers && filers.service !== '') {
      urlService = `${urlService}&service=${filers.service}`;
    }
    if (filers && filers.action !== '') {
      urlService = `${urlService}&action=${filers.action}`;
    }
    if (filers && filers.elementType !== '') {
      urlService = `${urlService}&elementType=${filers.elementType}`;
    }

    return this
      .http
      .get(urlService, this.httpOptions)
      .pipe(
        map(a => a.body as PageResource<AuditContextResource>));
  }


}
