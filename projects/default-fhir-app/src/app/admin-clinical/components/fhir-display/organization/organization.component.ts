import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-fhir-organization',
  templateUrl: 'organization.component.html',
  styleUrls: ['organization.component.scss']
})
export class AppOrganizationComponent {

  @Input()
  condensed = false;
  internalValue: fhir.r4.Reference;


  @Output()
  organizationDetailClicked: EventEmitter<fhir.r4.Reference> = new EventEmitter<fhir.r4.Reference>();

  get value(): fhir.r4.Reference {
    return this.internalValue;
  }

  @Input()
  set value(value: fhir.r4.Reference) {
    this.internalValue = value;
  }


  onOrganizationDetailClicked() {
    this.organizationDetailClicked.emit(this.internalValue);
  }
}
