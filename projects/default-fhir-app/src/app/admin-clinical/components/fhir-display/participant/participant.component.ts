import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-fhir-participant',
  templateUrl: 'participant.component.html',
  styleUrls: ['participant.component.scss']
})
export class ParticipantComponent {

  @Input()
  mode = 'small';

  @Input()
  condensed = false;

  internalValue: fhir.r4.EncounterParticipant;

  @Output()
  paticipantDetailClicked: EventEmitter<fhir.r4.EncounterParticipant> = new EventEmitter<fhir.r4.EncounterParticipant>();


  get value(): fhir.r4.EncounterParticipant {
    return this.internalValue;
  }

  @Input()
  set value(value: fhir.r4.EncounterParticipant) {
    this.internalValue = value;
  }

  onPaticipantDetail() {
    this.paticipantDetailClicked.emit(this.internalValue);
  }

}
