import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {UserResource} from '../domain/user/resource/UserResource';
import {UpdateUserInformationsDto} from '../domain/user/command/UpdateUserInformationsDto';
import {AddUserDto} from '../domain/user/command/AddUserDto';
import {UserCreatedResource} from '../domain/user/resource/UserCreatedResource';
import {FappiUrlService} from './FappiUrlService';
import {SetUserLanguageDto} from '../domain/user/command/SetUserLanguageDto';
import {ResetPasswordDto} from '../domain/user/command/ResetPasswordDto';
import {AskPasswordUpdateDto} from '../domain/user/command/AskPasswordUpdateDto';
import {DeleteUserDto} from "../domain/user/command/DeleteUserDto";
import {ConfirmDeleteUserDto} from "../domain/user/command/ConfirmDeleteUserDto";


@Injectable({
  providedIn: 'root',
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  private baseUrl = '/user/v1/';

  constructor(private http: HttpClient, private fappiUrlService: FappiUrlService) {
  }

  findAll(showDeleted: boolean = false): Observable<UserResource[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}?showDeleted=${showDeleted}`, this.httpOptions)
      .pipe(
        map(a => a.body as UserResource[]));
  }

  findAllByOrganization(organizationId: string, showDeleted: boolean = false): Observable<UserResource[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}?organizationId=${organizationId}&showDeleted=${showDeleted}`, this.httpOptions)
      .pipe(
        map(a => a.body as UserResource[]));
  }

  findOne(id: string): Observable<UserResource> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}${id}`, this.httpOptions)
      .pipe(
        map(a => a.body as UserResource));
  }

  addUser(user: AddUserDto): Observable<UserCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}admin/?async=false`, user, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as UserCreatedResource;
        }));
  }

  updateUser(updateUserInformationsDto: UpdateUserInformationsDto): Observable<void> {
    return this
      .http.put(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}admin/?async=false`, updateUserInformationsDto, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }

  setUserLanguage(userLanguageDto: SetUserLanguageDto) {
    return this
      .http.put(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}admin/setLanguage?async=false`, userLanguageDto, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }

  resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this
      .http.put(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}admin/resetPassword?async=false`, resetPasswordDto, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }

  askPasswordUpdate(askPasswordUpdateDto: AskPasswordUpdateDto) {
    return this
      .http.put(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}admin/askPasswordUpdate?async=false`, askPasswordUpdateDto, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }


  deleteUser(deleteUserDto: DeleteUserDto) {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}admin/delete?async=false`, deleteUserDto, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }
  confirmDeleteUser(confirmDeleteUserDto: ConfirmDeleteUserDto) {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}admin/confirmDelete?async=false`, confirmDeleteUserDto, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }

  /**
   * Validate that a string matches password rules.
   *
   * @param password the string to check
   */
  validatePasswordFormat(password: string) {
    const passRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})');
    return passRegex.test(password);
  }
}
