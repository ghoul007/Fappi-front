import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {OrganizationService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';
import {FhirJsHttpService} from 'ng-fhirjs';
import {FhirUtils} from '../../../service/fhir-utils';
import {Location} from '@angular/common';

@Component({
  templateUrl: './practitioner-detail.component.html',
  styleUrls: ['./practitioner-detail.component.scss']
})
export class PractitionerDetailComponent {

  // fhir practitioner id
  id: string;
  practitioner: fhir.r4.Practitioner;
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
      this.id = params.get('practitionerId');
      const readObj = {type: this.orgId + '/default/Practitioner', id: this.id};
      this.fhirHttpService.read(readObj).then(response => {
        this.practitioner = response.data as fhir.r4.Practitioner;
        if (this.practitioner.name) {
          this.name = FhirUtils.humanNameToString(this.practitioner.name);
        } else {
          this.name = this.practitioner.id;
        }
      });
    });
  }

  back() {
    window.history.back();
  }

}
