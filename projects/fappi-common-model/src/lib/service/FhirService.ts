import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FappiUrlService} from './FappiUrlService';
import {ImportFhirDataDto} from '../domain/fhir/dto/ImportFhirDataDto';


@Injectable({
  providedIn: 'root',
})
export class FhirService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  private baseUrlAdmin = '/api/fhir/v1/admin';

  constructor(private http: HttpClient, private fappiUrlService: FappiUrlService) {
  }

  importFhirData(importFhirDataDto: ImportFhirDataDto): Observable<string> {
    return this
      .http
      .post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlAdmin}/import-fhir`, importFhirDataDto, this.httpOptions)
      .pipe(
        map(a => a.body as string));
  }
}
