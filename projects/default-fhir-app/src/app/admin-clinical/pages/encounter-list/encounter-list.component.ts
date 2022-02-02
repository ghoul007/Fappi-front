import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {OrganizationService} from 'fappi-common-model';
import {ActivatedRoute, Router} from '@angular/router';
import {FhirJsHttpService, QueryObj} from 'ng-fhirjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  templateUrl: './encounter-list.component.html',
  styleUrls: ['./encounter-list.component.scss']
})
export class EncounterListComponent implements OnInit {


  searched = false;
  bundle: fhir.r4.Bundle;
  dataSource = new MatTableDataSource<fhir.r4.BundleEntry>();

  length = 100;
  pageSize = 10;
  pageIndex = 0;

  pageSizeOptions = [this.pageSize];
  public searchParams: FormGroup;

  selectedEncounter: fhir.r4.Encounter;

  selectedOrganizationId: string;
  orgName = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  BIG_DEF_COLUMNS: string[] = [
    'class',
    'type',
    'participant',
    'period',
    'serviceProvider',
    'actionsCol'
  ];
  SMALL_DEF_COLUMNS: string[] = [
    'type',
    'serviceProvider',
    'actionsCol'
  ];
  displayedColumns: string[] = [];

  constructor(private organizationService: OrganizationService, private router: Router,
              private route: ActivatedRoute, private fhirHttpService: FhirJsHttpService, private fb: FormBuilder,
              private breakpointObserver: BreakpointObserver) {

    this.searchParams = this.fb.group({
      id: new FormControl(''),
      dateStart: new FormControl(''),
      dateEnd: new FormControl(''),
    });

    breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe(result => {
      if (result.matches) {
        this.displayedColumns = this.BIG_DEF_COLUMNS;
      } else {
        this.displayedColumns = this.SMALL_DEF_COLUMNS;
      }
    });
  }

  ngOnInit() {
    this.route.parent.parent.params.subscribe((params) => {
      this.initOrg(params.orgId);
    });
  }

  initOrg(orgId) {
    this.selectedOrganizationId = orgId;
    this.organizationService.findOne(this.selectedOrganizationId).subscribe((o) => {
      this.orgName = o.name;
      const query = {
        type: this.selectedOrganizationId + '/default/Encounter',
        query: {
          _count: this.pageSize,
        },
      } as QueryObj;

      this.searchParams.valueChanges
        .pipe(
          debounceTime(400),
          distinctUntilChanged()
        )
        .subscribe(terms => {
          const queryEncounters = {...query};
          queryEncounters.query = {...query.query};
          if (terms.id) {
            queryEncounters.query.id = terms.id;
          }
          if (terms.dateStart) {
            queryEncounters.query['location-period'] = 'gt' + this.formatDate(terms.dateStart);
          }
          if (terms.dateEnd) {
            queryEncounters.query['location-period'] = 'lt' + this.formatDate(terms.dateEnd);
          }
          this.fhirHttpService.search(queryEncounters).then(response => {
            this.pageIndex = 0;
            this.setBundle(response.data as fhir.r4.Bundle);
          });
        });
      this.fhirHttpService.search(query).then(response => {
        this.setBundle(response.data as fhir.r4.Bundle);
      });

    });
  }


  setBundle(bundle: fhir.r4.Bundle) {
    this.bundle = bundle;
    this.length = this.bundle.total;
    this.dataSource.data = this.bundle.entry;
    this.selectedEncounter = undefined;
  }

  selectRow(row: fhir.r4.BundleEntry) {
    const selection = row.resource;
    const readObj = {type: 'Encounter', id: selection.id};
    this.fhirHttpService.read(readObj).then(response => {
      this.selectedEncounter = response.data as fhir.r4.Encounter;
    });
  }

  viewEncounter(row: fhir.r4.BundleEntry) {
    this.router.navigate(['/org/' + this.selectedOrganizationId + '/clinical/encounter/' + row.resource.id]);
  }

  reloadFilters(event) {

  }


  goToPage(event: PageEvent) {
    if (event.pageIndex > this.pageIndex) {
      this.fhirHttpService.nextPage({bundle: this.bundle}).then(response => {
        this.pageIndex = event.pageIndex;
        this.setBundle(response.data as fhir.r4.Bundle);
      });
    } else {
      this.fhirHttpService.prevPage({bundle: this.bundle}).then(response => {
        this.pageIndex = event.pageIndex;
        this.setBundle(response.data as fhir.r4.Bundle);
      });
    }
  }

  // FIXME REFACTORER = les popups doivent être générique, tout dans une référence qui affiche le bon truc
  gotToParticipant(encounterParticipant: fhir.r4.EncounterParticipant) {
    if (encounterParticipant.individual && encounterParticipant.individual.reference &&
      encounterParticipant.individual.reference.startsWith('Practitioner/')) {
      this.router.navigate(['org', this.selectedOrganizationId, 'clinical', 'practitioner',
        encounterParticipant.individual.reference.replace('Practitioner/', '')]);
    } else {
      alert('Sorry, this is not supported.');
    }
  }

  gotToOrganization(organization: fhir.r4.Reference) {
    if (!organization.reference || !organization.reference.startsWith('Organization/')) {
      alert('Sorry, this is not supported.');
    } else {
      this.router.navigate(['org', this.selectedOrganizationId, 'clinical', 'organization', organization.reference.replace('Organization/', '')]);
    }
  }

  formatDate(date: number) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }
}
