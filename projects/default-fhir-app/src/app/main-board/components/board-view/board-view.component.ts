import {Component, OnInit} from '@angular/core';
import {OrganizationService, UserService} from 'fappi-common-model';
import {ClinicalServiceResource} from '../../../domain/ClinicalServiceResource';
import {FhirJsHttpService, QueryObj} from 'ng-fhirjs';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss']
})
export class BoardViewComponent implements OnInit {

  public clinicalServiceResources: ClinicalServiceResource[] = [];

  constructor(private organizationService: OrganizationService, private fhirHttpService: FhirJsHttpService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.organizationService.findAll().subscribe((org) => {
      this.clinicalServiceResources = org.map((o) => {
        // FIXME dont calculate statistics on the client side:
        const clinicalServiceResource = new ClinicalServiceResource();
        clinicalServiceResource.organization = o;
        clinicalServiceResource.patientCount = 0;
        const query = {
          type: o.id.id + '/default/Patient', query: {_count: 0, _summary: 'true'},
        } as QueryObj;
        this.fhirHttpService.search(query).then(response => {
          const b = (response.data as fhir.r4.Bundle);
          clinicalServiceResource.patientCount = b.total;
        });
        this.userService.findAllByOrganization(o.id.id).subscribe((users) => {
          clinicalServiceResource.userCount = users.length;
        });
        return clinicalServiceResource;
      });
    });
  }

}
