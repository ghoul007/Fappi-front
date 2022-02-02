import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialog, UXMessageService} from 'fappi-ng-material-kit';
import {
  AskPasswordUpdateDto, ResetPasswordDto,
  UserIdDto,
  UserService
} from 'fappi-common-model';
import {MatDialog} from '@angular/material/dialog';
import {ResetPasswordData, ResetPasswordDialogComponent} from './reset-password-dialog/reset-password-dialog.component';

export class Language {
  constructor(public code: string, public label: string) {
  }
}

@Component({
  selector: 'app-useraccount-actions',
  templateUrl: './useraccount-actions.component.html',
  styleUrls: ['./useraccount-actions.component.scss']
})
export class UserAccountActionsComponent {

  /**
   * True when sending information to the server
   */
  processing = false;

  private _username: string;

  get username(): string {
    return this._username;
  }

  @Input()
  set username(u: string) {
    if (this._username === u) {
      return;
    }
    this._username = u;
    if (this._username) {
      this.initData();
    }
  }

  constructor(private fb: FormBuilder, private userService: UserService,
              private route: ActivatedRoute, private uxMessageService: UXMessageService, private dialog: MatDialog) {
  }

  initData() {
    this.userService.findOne(this.username).subscribe(user => {
        this.username = user.username;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  onAskResetPassword() {
    const dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSubmitFormConfirm();
      }
    });
  }

  onSubmitFormConfirm() {
    this.processing = true;
    const askPasswordUpdateDto = new AskPasswordUpdateDto();
    const userIdDto: UserIdDto = new UserIdDto();
    userIdDto.username = this.username;
    askPasswordUpdateDto.userId = userIdDto;

    this.userService.askPasswordUpdate(askPasswordUpdateDto).subscribe((ret) => {
        this.processing = false;
        this.uxMessageService.handleSuccess('User updated');
      },
      (err) => {
        this.processing = false;
        this.uxMessageService.handleError(err);
      }
    );
  }

  onResetPassword() {
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
      width: '450px',
      maxWidth: '100%',
      data: {
        isOwner: false,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const resetPasswordDto = new ResetPasswordDto();
        const userIdDto: UserIdDto = new UserIdDto();
        userIdDto.username = this.username;
        resetPasswordDto.userId = userIdDto;
        resetPasswordDto.newPassword = (result as ResetPasswordData).newPassword;
        resetPasswordDto.temporary = (result as ResetPasswordData).isTemporary;
        this.userService.resetPassword(resetPasswordDto).subscribe((ret) => {
            this.processing = false;
            this.uxMessageService.handleSuccess('Password changed');
          },
          (err) => {
            this.processing = false;
            this.uxMessageService.handleError(err);
          }
        );
      }
    });
  }

  back() {
    window.history.back();
  }


}
