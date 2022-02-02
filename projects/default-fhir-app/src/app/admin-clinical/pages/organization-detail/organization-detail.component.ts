import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {OrganizationService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';
import {FhirJsHttpService} from 'ng-fhirjs';
import {Location} from '@angular/common';

@Component({
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent {

  // fhir org id
  id: string;
  // fhir org
  organization: fhir.r4.Organization;
  name: string;
  // Faber app org id
  orgId: string;

  constructor(private fb: FormBuilder, private organizationService: OrganizationService, private router: Router,
              private route: ActivatedRoute, private uxMessageService: UXMessageService, public dialog: MatDialog,
              private fhirHttpService: FhirJsHttpService, private location: Location) {
    this.initData();
  }

  initData() {
    this.route.paramMap.subscribe(params => {
      this.orgId = this.route.parent.parent.snapshot.params.orgId;
      this.id = params.get('organizationId');
      const readObj = {type: this.orgId + '/default/Organization', id: this.id};
      this.fhirHttpService.read(readObj).then(response => {
        this.organization = response.data as fhir.r4.Organization;
        if (this.organization.name) {
          this.name = this.organization.name;
        } else {
          this.name = this.organization.id;
        }
      });
    });
  }

  back() {
    window.history.back();
  }

}
