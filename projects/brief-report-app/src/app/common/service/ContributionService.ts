import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ContributionDto} from '../model/dto/ContributionDto';
import {FappiUrlService, PageResource} from 'fappi-common-model';
import {NodeStatusResource} from '../model/resource/NodeStatusResource';
import {CreateCommentDto} from '../model/dto/CreateCommentDto';
import {CommentResource} from '../model/resource/CommentResource';
import {UpdateCommentDto} from '../model/dto/UpdateCommentDto';
import {DeleteCommentDto} from '../model/dto/DeleteCommentDto';
import {AddContributionDto} from '../model/dto/AddContributionDto';
import {ContributionResource} from '../model/dto/ContributionResource';

@Injectable({
  providedIn: 'root',
})
export class ContributionService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };

  constructor(private http: HttpClient, private fappiUrlService: FappiUrlService) {
  }

  getStatus(orgId: string, chapterId: string): Observable<NodeStatusResource[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}/api/editor/mark-edit/${orgId}/${chapterId}/status`,
        this.httpOptions)
      .pipe(
        map(a => {
          return a.body as NodeStatusResource[];
        }));
  }

  findNodeComments(orgId: string, chapterId: string, nodeSlug: string): Observable<CommentResource[]> {
    return this
      .http.get(`${this.fappiUrlService.apiBaseUrl}/api/comments/${orgId}/${chapterId}${nodeSlug}`,
        this.httpOptions)
      .pipe(
        map(a => {
          return a.body as CommentResource[];
        }));
  }

  createComment(createCommentDto: CreateCommentDto): Observable<boolean> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}/api/comments/create-comment`,
        createCommentDto, this.httpOptions)
      .pipe(
        map(a => {
          return true;
        }));
  }

  updateComment(updateCommentDto: UpdateCommentDto): Observable<void> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}/api/comments/update-comment`,
        updateCommentDto, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }

  deleteComment(deleteCommentDto: DeleteCommentDto): Observable<void> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}/api/comments/delete-comment`,
        deleteCommentDto, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }

  markEdit(orgId: string, chapterId: string, contributionDto: ContributionDto): Observable<void> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}/api/editor/mark-edit/${orgId}/${chapterId}`,
        contributionDto, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }

  endEdit(orgId: string, chapterId: string, contributionDto: ContributionDto): Observable<void> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}/api/editor/mark-edit/${orgId}/${chapterId}`,
        contributionDto, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }


  addContribution(orgId: string, chapterId: string, addContributionDto: AddContributionDto): Observable<void> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}/api/editor/add-contribution/${orgId}/${chapterId}`,
        addContributionDto, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }

  findMyContributions(orgId: string): Observable<PageResource<ContributionResource>> {
    return this
      .http.get(`${this.fappiUrlService.apiBaseUrl}/api/editor/find-my-contributions/${orgId}`, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as  PageResource<ContributionResource>;
        }));
  }
}
