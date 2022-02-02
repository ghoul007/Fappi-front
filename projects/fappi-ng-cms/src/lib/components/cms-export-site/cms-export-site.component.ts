import {Component, Inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ExportSiteDto, OrganizationIdDto, SiteService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  templateUrl: './cms-export-site.component.html',
  styleUrls: ['./cms-export-site.component.scss'],
  providers: []
})
export class CmsExportSiteComponent {

  data = {exportSites: true, exportGlobalNodeTypes: true, exportNodeTypes: true, name: ''};
  orgId: string;

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public inData: any,
              protected fb: FormBuilder,
              protected dialog: MatDialog,
              protected siteService: SiteService, protected uxMessageService: UXMessageService) {
    this.orgId = inData.orgId;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  startExport() {
    const dto = new ExportSiteDto();
    dto.exportSites = this.data.exportSites;
    dto.exportGlobalNodeTypes = this.data.exportGlobalNodeTypes;
    dto.exportNodeTypes = this.data.exportNodeTypes;
    dto.name = this.data.name;
    dto.organizationIdDto = new OrganizationIdDto();
    dto.organizationIdDto.id = this.orgId;

    this.siteService.exportNode(dto).subscribe((r) => {
      this.uxMessageService.handleSuccess('Export launched');
    });
  }
}

