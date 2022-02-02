import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FappiPermissionResource, SiteService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';


@Component({
  templateUrl: './cms-edit-rights.component.html',
  styleUrls: ['./cms-edit-rights.component.scss'],
  providers: []
})
export class CmsEditRightsComponent {

  permissions: FappiPermissionResource [];
  siteId: string;
  orgId: string;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private siteService: SiteService,
    private uxMessageService: UXMessageService
  ) {
    this.siteId = data.siteId;
    this.orgId = data.orgId;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
