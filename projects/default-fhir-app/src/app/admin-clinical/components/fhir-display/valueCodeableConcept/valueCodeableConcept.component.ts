import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-fhir-value-codeable-concept',
  templateUrl: 'valueCodeableConcept.component.html',
  styleUrls: ['valueCodeableConcept.component.scss']
})
export class ValueCodeableConceptComponent {

  internalValue: fhir.r4.CodeableConcept;

  get value(): fhir.r4.CodeableConcept {
    return this.internalValue;
  }

  @Input()
  set value(value: fhir.r4.CodeableConcept) {
    this.internalValue = value;
  }

}
