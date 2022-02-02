import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UserResource, UserService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-select-user',
  templateUrl: 'select-user.dialog.component.html',
})
export class SelectUserDialog {

  users: UserResource[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    userService: UserService,
    private uxMessageService: UXMessageService
  ) {
    userService.findAll().subscribe((users) => {
        this.users = users;
      },
      (err) => this.uxMessageService.handleError(err));
  }

}
