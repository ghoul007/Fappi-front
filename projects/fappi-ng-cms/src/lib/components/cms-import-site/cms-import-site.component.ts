import {Component, Inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ImportSiteDto, MediaId, OrganizationIdDto, SiteService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FileChooserComponent} from 'fappi-ng-media';


@Component({
  templateUrl: './cms-import-site.component.html',
  styleUrls: ['./cms-import-site.component.scss'],
  providers: []
})
export class CmsImportSiteComponent {

  importFile: MediaId;
  mergeNodes = true;
  mergeNodeTypes = true;
  importNodeTypes = true;
  orgId: string;

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              protected fb: FormBuilder,
              protected dialog: MatDialog,
              protected siteService: SiteService, protected uxMessageService: UXMessageService) {
    this.orgId = data.orgId;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  startImport() {
    const dto = new ImportSiteDto();
    dto.fileToImport = this.importFile;
    dto.mergeNodes = this.mergeNodes;
    dto.mergeNodeTypes = this.mergeNodeTypes;
    dto.importNodeTypes = this.importNodeTypes;
    dto.organizationIdDto = new OrganizationIdDto();
    dto.organizationIdDto.id = this.orgId;

    this.siteService.importNode(dto).subscribe((r) => {
      this.uxMessageService.handleSuccess('Export launched');
    });
  }

  chooseFile(fieldSlug: string) {
    const dialogRef = this.dialog.open(FileChooserComponent, {
      width: '650px', data: {orgId: this.orgId}
    });
    dialogRef.afterClosed().subscribe(result => {
      const mediaId = new MediaId();
      mediaId.orgId = this.orgId;
      mediaId.id = result.media.id;
      mediaId.url = result.media.path;
      this.importFile = mediaId;
    });
  }
}

