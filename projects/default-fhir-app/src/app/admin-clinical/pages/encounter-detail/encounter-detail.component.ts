import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';
import {FhirJsHttpService} from 'ng-fhirjs';
import {OrganizationService} from 'fappi-common-model';

@Component({
  templateUrl: './encounter-detail.component.html',
  styleUrls: ['./encounter-detail.component.scss']
})
export class EncounterDetailComponent implements OnInit {

  id: string;
  encounter: fhir.r4.Encounter;
  observations: fhir.r4.Observation[];
  episodeSelectorOpenned = true;
  orgId: string;


  constructor(private organizationService: OrganizationService, private router: Router, private fhirHttpService: FhirJsHttpService,
              private route: ActivatedRoute, private uxMessageService: UXMessageService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.orgId = this.route.parent.parent.snapshot.params.orgId;
      this.id = params.get('encounterId');
      const readObj = {type: this.orgId + '/default/Encounter', id: this.id};
      this.fhirHttpService.read(readObj).then(response => {
        this.encounter = response.data as fhir.r4.Encounter;
      });
    });
  }

  goToEpisode(episode: fhir.r4.Encounter) {
    this.router.navigate(['org', this.orgId, 'clinical', 'encounter', episode.id]);
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

  gotToOrganization(organization: fhir.r4.Reference) {
    if (!organization.reference || !organization.reference.startsWith('Organization/')) {
      alert('Sorry, this is not supported.');
    } else {
      this.router.navigate(['org', this.orgId, 'clinical', 'organization', organization.reference.replace('Organization/', '')]);
    }
  }
}
