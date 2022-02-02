import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';
import {FhirJsHttpService} from 'ng-fhirjs';
import {OrganizationService} from 'fappi-common-model';
import {FhirUtils} from '../../../service/fhir-utils';

@Component({
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

  id: string;
  subtitleName = '';
  subtitleAge = '';
  patient: fhir.r4.Patient;
  orgId: string;
  latestAnalyses: fhir.r4.Observation[] = [];
  allergy: fhir.r4.AllergyIntolerance[] = [];
  immunizations: fhir.r4.Immunization[] = [];
  latestEncounters: fhir.r4.Encounter[] = [];

  constructor(private organizationService: OrganizationService, private router: Router, private fhirHttpService: FhirJsHttpService,
              private route: ActivatedRoute, private uxMessageService: UXMessageService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.orgId = this.route.parent.parent.snapshot.params.orgId;
      this.id = params.get('patientId');

      this.setUpAnalyses();
      this.setUpAllergy();
      this.setUpImmunization();
      this.setUpLatestEncounters();


      const readObj = {type: this.orgId + '/default/Patient', id: this.id};
      this.fhirHttpService.read(readObj).then(response => {
        this.patient = response.data;

        if (this.patient.name) {
          this.subtitleName = FhirUtils.humanNameToString(this.patient.name);
        }
        // take the server value to calculate the age:
        if (this.patient.birthDate && response.headers.get('date')) {
          const birthdate = new Date(this.patient.birthDate);
          const cur = new Date(response.headers.get('date'));
          const diff = cur.getTime() - birthdate.getTime(); // This is the difference in milliseconds
          this.subtitleAge = '' + Math.floor(diff / 31557600000);
        }

      });

    });
  }

  getDisplayName(): string {
    if (!this.patient) {
      return '-';
    }
    let name = this.patient.id;
    for (const n of this.patient.name) {
      if (n.given) {
        name = n.given + ' ';
      }
      name = name + n.family;
    }
    return name;
  }

  goToEpisode(episode: fhir.r4.Encounter) {
    this.router.navigate(['org', this.orgId, 'clinical', 'encounter', episode.id]);
  }

  gotToOrganization(organization: fhir.r4.Reference) {
    if (!organization.reference || !organization.reference.startsWith('Organization/')) {
      alert('Sorry, this is not supported.');
    } else {
      this.router.navigate(['org', this.orgId, 'clinical', 'organization', organization.reference.replace('Organization/', '')]);
    }
  }

  // FIXME REFACTORER = les popups doivent être générique, tout dans une référence qui affiche le bon truc
  gotToParticipant(encounterParticipant: fhir.r4.EncounterParticipant) {
    if (encounterParticipant.individual && encounterParticipant.individual.reference &&
      encounterParticipant.individual.reference.startsWith('Practitioner/')) {
      this.router.navigate(['org', this.orgId, 'clinical', 'practitioner',
        encounterParticipant.individual.reference.replace('Practitioner/', '')]);
    } else {
      alert('Sorry, this is not supported.');
    }
  }


  setUpAnalyses() {
    const readObj = {
      type: this.orgId + '/default/Observation', query: {
        _count: 5,
        _summary: 'true',
        category: 'laboratory',
        subject: 'Patient/' + this.id,
        _sort: 'date',
      }
    };
    this.fhirHttpService.search(readObj).then(response => {
      const bundle = response.data as fhir.r4.Bundle;
      this.latestAnalyses = [];
      if (bundle.total > 0) {
        for (const entry of bundle.entry) {
          this.latestAnalyses.push(entry.resource as fhir.r4.Observation);
        }
      }
    });
  }

  setUpAllergy() {
    const readObj = {
      type: this.orgId + '/default/AllergyIntolerance', query: {
        _count: 100,
        patient: 'Patient/' + this.id
      }
    };
    this.fhirHttpService.search(readObj).then(response => {
      const bundle = response.data as fhir.r4.Bundle;
      this.allergy = [];
      if (bundle.total > 0) {
        for (const entry of bundle.entry) {
          this.allergy.push(entry.resource as fhir.r4.AllergyIntolerance);
        }
      }
    });
  }
  setUpImmunization() {
    const readObj = {
      type: this.orgId + '/default/Immunization', query: {
        _count: 100,
        patient: 'Patient/' + this.id
      }
    };
    this.fhirHttpService.search(readObj).then(response => {
      const bundle = response.data as fhir.r4.Bundle;
      this.immunizations = [];
      if (bundle.total > 0) {
        for (const entry of bundle.entry) {
          this.immunizations.push(entry.resource as fhir.r4.Immunization);
        }
        this.immunizations = this.immunizations.reverse();
      }
    });
  }

  setUpLatestEncounters() {
    const readObj = {
      type: this.orgId + '/default/Encounter', query: {
        _count: 3,
        subject: 'Patient/' + this.id
      }
    };
    this.fhirHttpService.search(readObj).then(response => {
      const bundle = response.data as fhir.r4.Bundle;
      this.latestEncounters = [];
      if (bundle.total > 0) {
        for (const entry of bundle.entry) {
          this.latestEncounters.push(entry.resource as fhir.r4.Encounter);
        }
      }
    });
  }

}
