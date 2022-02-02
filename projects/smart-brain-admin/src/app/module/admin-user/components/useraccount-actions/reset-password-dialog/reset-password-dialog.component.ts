import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserService} from 'fappi-common-model';

/**
 * if isOwner is true, we will prompt for the old passward of the user.
 */
export class ResetPasswordData {
  constructor(public oldPassword: string, public newPassword: string, public isOwner: boolean, public isTemporary: boolean) {
  }
}

@Component({

  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialogComponent {

  confirmPassword: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ResetPasswordData, private userService: UserService) {
  }

  isValid() {
    if (this.data.isOwner) {
      return this.confirmPassword === this.data?.newPassword
        && this.data.oldPassword?.length > 0
        ;
    } else {
      return this.confirmPassword === this.data?.newPassword && this.userService.validatePasswordFormat(this.data?.newPassword);
    }
  }

}
