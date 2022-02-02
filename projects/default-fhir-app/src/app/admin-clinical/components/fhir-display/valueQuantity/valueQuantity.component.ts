import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-fhir-value-quantity',
  templateUrl: 'valueQuantity.component.html',
  styleUrls: ['valueQuantity.component.scss']
})
export class ValueQuantityComponent {

  internalValue: fhir.r4.Quantity;

  get value(): fhir.r4.Quantity {
    return this.internalValue;
  }

  @Input()
  set value(value: fhir.r4.Quantity) {
    this.internalValue = value;
  }

}
