import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {OrganizationService} from 'fappi-common-model';
import {FhirJsHttpService, QueryObj} from 'ng-fhirjs';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';
import {FhirUtils} from '../../../../service/fhir-utils';

import * as shape from 'd3-shape';

@Component({
  selector: 'app-resporatory-rate-graph',
  templateUrl: './respiratory-rate-graph.component.html',
  styleUrls: ['./respiratory-rate-graph.component.scss']
})
export class RespiratoryRateGraphComponent implements OnChanges, AfterViewInit {

  @ViewChild('wrapper')elementView: ElementRef;

  internalPatientId: string;
  internalEpisodeId: string;
  observations: fhir.r4.Observation[] = [];
  // Faber app orgId
  orgId: string;
  width = 500;
  @Input()
  showLegend = true;

  showGraph = false;

  internaleObservationSeries: string[] = [];
  chartData = [];

  lineChartLineInterpolation = shape.curveBasis;


  constructor(private organizationService: OrganizationService, private fhirHttpService: FhirJsHttpService,
              private uxMessageService: UXMessageService, public dialog: MatDialog) {
  }

  get patientId(): string {
    return this.internalPatientId;
  }

  @Input()
  set patientId(patient: string) {
    this.internalPatientId = patient;
   // this.loadObservations();
  }

  get organizationId(): string {
    return this.orgId;
  }

  @Input()
  set organizationId(orgId: string) {
    this.orgId = orgId;
   // this.loadObservations();
  }

  get episodeId(): string {
    return this.internalEpisodeId;
  }

  @Input()
  set episodeId(episode: string) {
    this.internalEpisodeId = episode;
  //  this.loadObservations();
  }

  get observationSeries(): string[] {
    return this.internaleObservationSeries;
  }
  @Input()
  set observationSeries(observationSeries: string[]) {
    this.internaleObservationSeries = observationSeries;
//    this.loadObservations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadObservations();
  }


  private loadObservations() {
    if (this.organizationId && this.observationSeries.length > 0) {
      const query = {
        type: this.organizationId + '/default/Observation',
        query: {
          _count: 102,
         // code: this.observationSeries.join(','),
          code: this.observationSeries.join(','),
        },
      } as QueryObj;

      if (this.patientId) {
        query.query.subject = this.patientId;
      }
      if (this.episodeId) {
        query.query.encounter = 'Encounter/' + this.internalEpisodeId;
      }
      this.fhirHttpService.search(query).then(response => {
        if (response.data.total > 0) {
          this.observations = (((response.data as fhir.r4.Bundle).entry).map(e => e.resource) as fhir.r4.Observation[]);
          this.chartData = [];
          const series = FhirUtils.findSeriesInObservations(this.observations);
          for (const serie of series) {
            if (serie.points.length > 0) {
              this.chartData.push({
                name: serie.name,
                series : serie.points
              });
            }
          }
          this.showGraph = true;
        } else {
          this.showGraph = false;
          this.observations = [];
          this.chartData = [];
        }
      });
    }
  }

  resolveValue(observation: fhir.r4.Observation) {
    if ( observation.valueQuantity ) {
      return observation.valueQuantity.value;
    }
  }


  ngAfterViewInit() {
    this.width = this.elementView.nativeElement.clientWidth;
  }

}
