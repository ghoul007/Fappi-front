import {Component, Input} from '@angular/core';
import {OrganizationService} from 'fappi-common-model';
import {FhirJsHttpService, QueryObj} from 'ng-fhirjs';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.component.html',
  styleUrls: ['./observation-list.component.scss']
})
export class ObservationListComponent {

  internalPatientId: string;
  internalEpisodeId: string;
  observations: fhir.r4.Observation[] = [];
  // Faber app orgId
  orgId: string;

  constructor(private organizationService: OrganizationService, private fhirHttpService: FhirJsHttpService,
              private uxMessageService: UXMessageService, public dialog: MatDialog) {
  }

  get patientId(): string {
    return this.internalPatientId;
  }

  @Input()
  set patientId(patient: string) {
    this.internalPatientId = patient;
    this.loadObservations();
  }

  get organizationId(): string {
    return this.orgId;
  }

  @Input()
  set organizationId(orgId: string) {
    this.orgId = orgId;
    this.loadObservations();
  }

  get episodeId(): string {
    return this.internalEpisodeId;
  }

  @Input()
  set episodeId(episode: string) {
    this.internalEpisodeId = episode;
    this.loadObservations();
  }

  private loadObservations() {
    if (this.organizationId && this.internalEpisodeId) {
      const query = {
        type: this.organizationId + '/default/Observation',
        query: {
          _count: 100,
        },
      } as QueryObj;

      if (this.patientId) {
        query.query.subject = 'Observation/' + this.patientId;
      }
      if (this.episodeId) {
        query.query.encounter = 'Encounter/' + this.internalEpisodeId;
      }
      this.fhirHttpService.search(query).then(response => {
        if (response.data.total > 0) {
          this.observations = (((response.data as fhir.r4.Bundle).entry).map(e => e.resource) as fhir.r4.Observation[]);
        } else {
          this.observations = [];
        }
      });
    }
  }
}
