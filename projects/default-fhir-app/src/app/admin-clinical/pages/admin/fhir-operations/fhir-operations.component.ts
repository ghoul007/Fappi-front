import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  CustomTypeResource,
  FhirService,
  ImportFhirDataDto,
  ImportFhirDataType,
  NodeResource,
  SiteService
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {FileChooserComponent} from 'fappi-ng-media';
import {MatDialog} from '@angular/material/dialog';

@Component({
  templateUrl: './fhir-operations.component.html',
  styleUrls: ['./fhir-operations.component.scss']
})
export class FhirOperationsComponent {

  name: string;
  orgId: string;
  importTypes = ImportFhirDataType;


  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService, private dialog: MatDialog, private fhirService: FhirService) {
    this.initData();
  }

  initData() {
    this.route.parent.paramMap.subscribe(params => {
      this.orgId = this.route.parent.parent.parent.snapshot.params.orgId;
    });
  }

  importFhirData(type: ImportFhirDataType) {
    const dialogRef = this.dialog.open(FileChooserComponent, {
      width: '650px', data: {orgId: this.orgId}
    });
    dialogRef.afterClosed().subscribe(result => {
      // launch
      if (result.media.id) {
        const importFhirDataDto = new ImportFhirDataDto();
        importFhirDataDto.orgId = this.orgId;
        importFhirDataDto.mediaId = result.media.id;
        importFhirDataDto.dataType = type;
        this.fhirService.importFhirData(importFhirDataDto).subscribe((s) => {
            this.uxMessageService.handleSuccess('Import launched');
        },
          (err) => {
            this.uxMessageService.handleError(err);
          });
      }
    });
  }



  back() {
    window.history.back();
  }

}
