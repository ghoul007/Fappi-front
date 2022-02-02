import {MatSnackBar} from '@angular/material/snack-bar';
import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class UXMessageService {

  constructor(private _snackBar: MatSnackBar) {
  }


  handleSuccess(message: string) {
    this._snackBar.open(message, 'Dismiss', {
      duration: 4000,
    });
  }

  handleError(err) {
    this._snackBar.open(this.findErrorMessageFromResponse(err), 'Dismiss', {
      duration: 10000,
    });
  }

  private findErrorMessageFromResponse(response: HttpErrorResponse) {
    let message = '';
    //validation error
    if (response.status == 400) {
      if (response.error) {

        if (response.error.errors) {
          for (let e of response.error.errors) {
            message += e.field + ': ' + e.defaultMessage + '. ';
          }
        } else {
          message = response.error.message;
        }
      } else {
        message = response.message;
      }
    } else if (response.status == 401) {
      message = 'Action unauthorized';
    } else {
      if (response.error) {
        if (response.error.message) {
          message = 'Error: ' + response.error.message;
        } else if (response.error.error) {
          message = 'Error: ' + response.error.error;
        } else {
          message = JSON.stringify(response.error);
        }
      } else {
        message = 'Error: ' + response.message;
      }
    }
    return message;
  }

}
