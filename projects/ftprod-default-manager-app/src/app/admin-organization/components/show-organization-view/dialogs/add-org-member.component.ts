import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {UXMessageService} from 'fappi-ng-material-kit';
import {UserResource, UserService} from 'fappi-common-model';
import {ShowOrganizationViewComponent} from '../show-organization-view.component';

@Component({
  templateUrl: './add-org-member.component.html',
  styleUrls: ['./add-org-member.component.scss'],
  providers: []
})
export class AddOrgMemberComponent {

  members: UserResource[];

  constructor(
    public dialogRef: MatDialogRef<ShowOrganizationViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    userService: UserService,
    private uxMessageService: UXMessageService
  ) {

    userService.findAll().subscribe((members) => {
        this.members = members;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  onClick(): void {
    debugger
    this.dialogRef.close(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
