import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-fhir-period',
  templateUrl: 'period.component.html',
  styleUrls: ['period.component.scss']
})
export class PeriodComponent {

  @Input()
  mode = 'small';

  internalValue: fhir.r4.Period;

  get value(): fhir.r4.Period {
    return this.internalValue;
  }

  @Input()
  set value(value: fhir.r4.Period) {
    this.internalValue = value;
  }
}
