import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-fhir-reference',
  templateUrl: 'reference.component.html',
  styleUrls: ['reference.component.scss']
})
export class ReferenceComponent {

  @Input()
  condensed = false;
  internalValue: fhir.r4.Reference;
  icon: { icon: string, label: string };

  get value(): fhir.r4.Reference {
    return this.internalValue;
  }

  @Input()
  set value(value: fhir.r4.Reference) {
    this.internalValue = value;
    if (value) {
      this.icon = this.resolveIcon(value.reference);
    }
  }

  resolveIcon(id: string): { icon: string, label: string } {
    if (id) {
      if (id.startsWith('Organization')) {
        return {icon: 'domain', label: 'Organization'};
      } else if (id.startsWith('Practitioner')) {
        return {icon: 'person', label: 'Practitioner'};
      }
    }
    return null;
  }


}
