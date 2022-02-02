import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OrganizationService} from 'fappi-common-model';
import {FhirJsHttpService, QueryObj} from 'ng-fhirjs';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent {

  internalPatientId: string;
  encounters: fhir.r4.Encounter[] = [];
  @Output()
  episodeClicked: EventEmitter<fhir.r4.Encounter> = new EventEmitter<fhir.r4.Encounter>();
  @Output()
  paticipantDetailClicked: EventEmitter<fhir.r4.EncounterParticipant> = new EventEmitter<fhir.r4.EncounterParticipant>();
  @Output()
  organizationDetailClicked: EventEmitter<fhir.r4.Reference> = new EventEmitter<fhir.r4.Reference>();
  // Faber app org id:
  private orgId: string;

  constructor(private organizationService: OrganizationService, private fhirHttpService: FhirJsHttpService,
              private uxMessageService: UXMessageService, public dialog: MatDialog) {
  }

  // Faberapp org id:
  get organizationId(): string {
    return this.orgId;
  }

  @Input()
  set organizationId(organizationId: string) {
    this.orgId = organizationId;
    this.loadEncounters();
  }


  get patientId(): string {
    return this.internalPatientId;
  }

  @Input()
  set patientId(patient: string) {
    this.internalPatientId = patient;
    this.loadEncounters();
  }

  onEpisodeClicked(encounter) {
    this.episodeClicked.emit(encounter);
  }

  onPaticipantDetailClicked(event: fhir.r4.EncounterParticipant) {
    this.paticipantDetailClicked.emit(event);
  }

  onOrganizationDetailClicked(event: fhir.r4.Reference) {
    this.organizationDetailClicked.emit(event);
  }

  private loadEncounters() {
    if (this.orgId && this.internalPatientId) {
      const query = {
        type: this.orgId + '/default/Encounter',
        query: {
          _count: 100,
          subject: 'Patient/' + this.patientId
        },
      } as QueryObj;
      this.fhirHttpService.search(query).then(response => {
        if (response.data.total > 0) {
          this.encounters = (((response.data as fhir.r4.Bundle).entry).map(e => e.resource) as fhir.r4.Encounter[]);
        } else {
          this.encounters = [];
        }
      });
    }
  }
}
