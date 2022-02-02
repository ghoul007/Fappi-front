import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AddProcessDto} from '../domain/process/dto/AddProcessDto';
import {ProcessOperationResultResource} from '../domain/process/resource/ProcessOperationResultResource';
import {UpdateProcessDto} from '../domain/process/dto/UpdateProcessDto';
import {DeleteProcessDto} from '../domain/process/dto/DeleteProcessDto';
import {ProcessDefinitionResource} from '../domain/process/resource/ProcessDefinitionResource';
import {PageResource} from '../domain/commons/PageResource';
import {FappiUrlService} from './FappiUrlService';
import {StartProcessInstancePayloadDto} from '../domain/task/StartProcessInstancePayloadDto';


@Injectable({
  providedIn: 'root',
})
export class ProcessService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  private baseUrlAdmin = '/activiti/admin/process-definition';
  private baseUrlClient = '/activiti/activiti';

  constructor(private http: HttpClient, private fappiUrlService: FappiUrlService) {
  }

  findAll(orgId: string): Observable<PageResource<ProcessDefinitionResource>> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlClient}/${orgId}/process-definitions`, this.httpOptions)
      .pipe(
        map(a => a.body as PageResource<ProcessDefinitionResource>));
  }

  add(addProcessDto: AddProcessDto): Observable<ProcessOperationResultResource> {
    return this
      .http
      .post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlAdmin}/add`, addProcessDto, this.httpOptions)
      .pipe(
        map(a => a.body as ProcessOperationResultResource));
  }

  update(updateProcessDto: UpdateProcessDto): Observable<ProcessOperationResultResource> {
    return this
      .http
      .post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlAdmin}/update`, updateProcessDto, this.httpOptions)
      .pipe(
        map(a => a.body as ProcessOperationResultResource));
  }

  delete(deleteProcessDto: DeleteProcessDto): Observable<ProcessOperationResultResource> {
    return this
      .http
      .post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlAdmin}/delete`, deleteProcessDto, this.httpOptions)
      .pipe(
        map(a => a.body as ProcessOperationResultResource));
  }

  find(orgId: string, id: string): Observable<ProcessDefinitionResource> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlClient}/${orgId}/process-definitions/${id}`, this.httpOptions)
      .pipe(
        map(a => a.body as ProcessDefinitionResource));
  }

  loadBpmFile(orgId: string, id: string): Observable<string> {
    return this.http.get(`/activiti/activiti/${orgId}/process-definitions/${id}/definition`, {
      headers: {observe: 'response'}, responseType: 'text'
    }).pipe(
      map(
        x => x as string
      ));
  }

  startProcess(organizationId: string, processId: string, payload: StartProcessInstancePayloadDto) {
    return this
      .http
      .post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlClient}/${organizationId}/process-instances/start/${processId}`,
        payload, this.httpOptions)
      .pipe(
        map(a => a.body as ProcessOperationResultResource));
  }


}
