import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {
  CreateVersionDto,
  ExportSiteDto,
  FappiPermissionResource,
  GroupResource,
  GroupService,
  NodeSlug, OrganizationIdDto, OrgElementSlugDto,
  OrgSiteNodeSlugDto,
  SetNodePermissionDto,
  SiteService
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-cms-add-site-version',
  templateUrl: './cms-add-site-version.component.html',
  styleUrls: ['./cms-add-site-version.component.scss'],
  providers: []
})
export class CmsAddSiteVersionComponent {

  data = {versionName: ''};
  orgId: string;
  siteId: string;

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public inData: any,
              protected fb: FormBuilder,
              protected dialog: MatDialog,
              protected siteService: SiteService, protected uxMessageService: UXMessageService) {
    this.orgId = inData.orgId;
    this.siteId = inData.siteId;
    if (!this.orgId || ! this.siteId) {
      console.log('To use the Dialog component CmsAddSiteVersion, you have to pass siteId and orgId params.');
    }
    uxMessageService.handleError('Error adding the version.');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create() {
    const dto = new CreateVersionDto();
    dto.versionName = this.data.versionName;
    dto.id = new OrgElementSlugDto();
    dto.id.organizationId = this.orgId;
    dto.id.elementId = this.siteId;

    this.siteService.createSiteVersion(dto).subscribe((r) => {
      this.uxMessageService.handleSuccess('Version creation started');
    });
  }

}
