import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {ShowGroupViewComponent} from '../show-group-view.component';
import {UXMessageService} from 'fappi-ng-material-kit';
import {UserResource, UserService} from 'fappi-common-model';

@Component({
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
  providers: []
})
export class AddMemberComponent {

  members: UserResource[];

  constructor(
    public dialogRef: MatDialogRef<ShowGroupViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    userService: UserService,
    private uxMessageService: UXMessageService
  ) {

    userService.findAllByOrganization(data.orgId).subscribe((members) => {
        this.members = members;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
