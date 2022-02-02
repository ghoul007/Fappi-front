import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {OrganizationService} from 'fappi-common-model';
import {ActivatedRoute, Router} from '@angular/router';
import {FhirJsHttpService, QueryObj} from 'ng-fhirjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {FhirUtils} from '../../../service/fhir-utils';

@Component({
  templateUrl: './practitioner-list-page.component.html',
  styleUrls: ['./practitioner-list-page.component.scss']
})
export class PractionerListPageComponent implements OnInit {


  searched = false;
  bundle: fhir.r4.Bundle;
  dataSource = new MatTableDataSource<fhir.r4.BundleEntry>();

  length = 100;
  pageSize = 10;
  pageIndex = 0;

  pageSizeOptions = [this.pageSize];
  selectedPractitioner: fhir.r4.Practitioner;
  public searchParams: FormGroup;

  selectedOrganizationId: string;
  orgName = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;


  BIG_DEF_COLUMNS: string[] = [
    'name',
    'actionsCol'
  ];
  SMALL_DEF_COLUMNS: string[] = [
    'name',
    'actionsCol'
  ];

  displayedColumns: string[] = [];


  constructor(private organizationService: OrganizationService, private router: Router,
              private route: ActivatedRoute, private fhirHttpService: FhirJsHttpService, private fb: FormBuilder,
              private breakpointObserver: BreakpointObserver) {

    this.searchParams = this.fb.group({
      name: new FormControl(''),
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
        type: this.selectedOrganizationId + '/default/Practitioner',
        query: {
          _count: this.pageSize,
          _summary: 'true',
          _sort: 'name',
        },
      } as QueryObj;

      this.searchParams.valueChanges
        .pipe(
          debounceTime(400),
          distinctUntilChanged()
        )
        .subscribe(terms => {
          const queryPractitioners = {...query};
          queryPractitioners.query = {...query.query};
          if (terms.name) {
            queryPractitioners.query.name = terms.name;
          }
          this.fhirHttpService.search(queryPractitioners).then(response => {
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
    this.selectedPractitioner = undefined;
  }


  selectRow(row: fhir.r4.BundleEntry) {
    const selection = row.resource;
    const readObj = {type: this.selectedOrganizationId + '/default/Practitioner', id: selection.id};
    this.fhirHttpService.read(readObj).then(response => {
      this.selectedPractitioner = response.data;
    });
  }

  viewPractitioner(row: fhir.r4.BundleEntry) {
    this.router.navigate(['/org/' + this.selectedOrganizationId + '/clinical/practitioner/' + row.resource.id]);
  }

  reloadFilters(event) {

  }

  formatName(practitioner: fhir.r4.Practitioner): string {
    return FhirUtils.humanNameToString(practitioner.name);
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
}
