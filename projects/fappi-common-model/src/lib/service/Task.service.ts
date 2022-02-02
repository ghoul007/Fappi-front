import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Task} from '../domain/task/Task';
import {FappiUrlService} from './FappiUrlService';
import {StartProcessInstancePayloadDto} from '../domain/task/StartProcessInstancePayloadDto';


@Injectable({
  providedIn: 'root',
})
export class TaskService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  private baseUrl = '/activiti/activiti/';

  constructor(private http: HttpClient, private fappiUrlService: FappiUrlService) {
  }

  findAll(orgId: string): Observable<Task[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}${orgId}/my-tasks`, this.httpOptions)
      .pipe(
        map(a => a.body as Task[]));
  }

  findOne(orgId: string, id: string): Observable<Task> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}${orgId}/my-tasks/${id}`, this.httpOptions)
      .pipe(
        map(a => a.body as Task));
  }

  findMetasOfOne(orgId: string, id: string): Observable<Task> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}${orgId}/process-instance-meta/${id}`, this.httpOptions)
      .pipe(
        map(a => a.body as Task));
  }

  start(orgId: string, processId: string, startProcessInstancePayloadDto: StartProcessInstancePayloadDto) {
    return this
      .http
      .post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}${orgId}/process-instances/start/${processId}`,
        startProcessInstancePayloadDto, this.httpOptions)
      .pipe(
        map(a => a.body as any));
  }

  complete(orgId: string, id: string, params: any): Observable<any> {
    return this
      .http
      .post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}${orgId}/my-tasks/${id}/complete`, params, this.httpOptions)
      .pipe(
        map(a => a.body as any));
  }

  delete(orgId: string, id: string): Observable<any> {
    return this
      .http
      .post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}${orgId}/my-tasks/${id}/delete`, null, this.httpOptions)
      .pipe(
        map(a => a.body as any));
  }


}
