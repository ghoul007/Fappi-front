import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-fhir-codeable-concept',
  templateUrl: 'codeable-concept.component.html',
  styleUrls: ['codeable-concept.component.scss']
})
export class CodeableConceptComponent {

  internalValue: fhir.r4.CodeableConcept;
  codings: fhir.r4.Coding[];

  get value(): fhir.r4.CodeableConcept {
    return this.internalValue;
  }

  @Input()
  set value(value: fhir.r4.CodeableConcept) {
    this.internalValue = value;
    this.codings = value.coding;
  }
}
