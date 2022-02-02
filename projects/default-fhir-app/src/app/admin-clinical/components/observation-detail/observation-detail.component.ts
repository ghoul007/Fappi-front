import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-observation-detail',
  templateUrl: './observation-detail.component.html',
  styleUrls: ['./observation-detail.component.scss']
})
export class ObservationDetailComponent {

  // condensed ui
  @Input()
  condensed = false;

  @Input()
  observation: fhir.r4.Observation;

}
