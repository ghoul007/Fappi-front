import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UserInfoService} from './UserInfoService';

/**
 * Handle HTTP 401 to avoid a silent unlog
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userInfoService: UserInfoService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(() => {
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.userInfoService.loggedOut.emit('loggedOut');
          } else if (err.status === 500 && err.error && err.error.message === '[invalid_grant] Session not active') {
            this.userInfoService.loggedOut.emit('loggedOut');
          }
          return;
        }
      }));
  }
}
