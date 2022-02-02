import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss']
})
export class EpisodeDetailComponent {

  @Input()
  condensed = false;

  @Input()
  encounter: fhir.r4.Encounter;

  @Output()
  episodeClicked: EventEmitter<fhir.r4.Encounter> = new EventEmitter<fhir.r4.Encounter>();
  @Output()
  paticipantDetailClicked: EventEmitter<fhir.r4.EncounterParticipant> = new EventEmitter<fhir.r4.EncounterParticipant>();
  @Output()
  organizationDetailClicked: EventEmitter<fhir.r4.Reference> = new EventEmitter<fhir.r4.Reference>();

  onEpisodeClicked() {
    this.episodeClicked.emit(this.encounter);
  }

  onPaticipantDetailClicked(event: fhir.r4.EncounterParticipant) {
    this.paticipantDetailClicked.emit(event);
  }

  onOrganizationDetailClicked(event: fhir.r4.Reference) {
    this.organizationDetailClicked.emit(event);
  }
}
