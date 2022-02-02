import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {OrganizationService} from 'fappi-common-model';
import {FhirJsHttpService, QueryObj} from 'ng-fhirjs';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';
import {FhirUtils} from '../../../service/fhir-utils';


@Component({
  selector: 'app-mini-observation-stat',
  templateUrl: './mini-observation-stat.component.html',
  styleUrls: ['./mini-observation-stat.component.scss']
})
export class MiniObservationStatComponent implements OnChanges {

  internalPatientId: string;
  internalEpisodeId: string;
  /**
   * Allow the value to be rounded
   */
  @Input()
  allowRound = false;
  @Input()
  title: string;
  // Faber app orgId
  orgId: string;
  internaleObservationToShow: string = null;
  observation: fhir.r4.Observation;

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
  }

  get observationToShow(): string {
    return this.internaleObservationToShow;
  }
  @Input()
  set observationToShow(observationToShow: string) {
    this.internaleObservationToShow = observationToShow;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadObservations();
  }


  private loadObservations() {
    if (this.organizationId && this.observationToShow) {
      const query = {
        type: this.organizationId + '/default/Observation',
        query: {
          _count: 1,
          code: this.observationToShow,
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
          const observations = (((response.data as fhir.r4.Bundle).entry).map(e => e.resource) as fhir.r4.Observation[]);
          if ( observations.length > 0 ) {
            this.observation = observations[0];
          }
        } else {
          this.observation = null;
        }
      });
    }
  }

  resolveValue(observation: fhir.r4.Observation) {
    if ( observation.valueQuantity ) {
      return observation.valueQuantity.value;
    }
  }


}
