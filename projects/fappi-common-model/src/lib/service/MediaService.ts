import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import {FappiUrlService} from './FappiUrlService';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UploadStatus} from '../domain/media/domain/UploadStatus';
import {MediaResource} from '../domain/media/resource/MediaResource';
import {DeleteMediaDto} from '../domain/media/dto/DeleteMediaDto';
import {MediaId} from '../../public-api';

@Injectable({
  providedIn: 'root',
})
export class MediaService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  private baseUrl = '/media';

  constructor(private http: HttpClient, private fappiUrlService: FappiUrlService) {
  }

  public list(organizationId: string, path: string, page: number, size: number): Observable<MediaResource[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/${organizationId}`, this.httpOptions)
      .pipe(
        map(a => a.body as MediaResource[]));
  }

  public upload(organizationId: string, data): Observable<UploadStatus> {
    const uploadURL = `${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/${organizationId}`;

    return this.http.post<any>(uploadURL, data, {
      withCredentials: true,
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const p = Math.round(100 * event.loaded / event.total);
            return {progress: p, done: p === 100};
          default:
            return {progress: 0, done: false};
        }
      })
    );
  }

  public delete(organizationId: string, element: MediaResource) {
    const deleteMediaDto: DeleteMediaDto = new DeleteMediaDto();
    deleteMediaDto.id = new MediaId();
    deleteMediaDto.id.orgId = organizationId;
    deleteMediaDto.id.id = element.id;

    return this
      .http
      .post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/${organizationId}/delete`, deleteMediaDto, this.httpOptions)
      .pipe(
        map(a => a.body as any));
  }

}
