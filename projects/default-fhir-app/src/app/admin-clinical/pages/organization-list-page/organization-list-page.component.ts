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
  templateUrl: './organization-list-page.component.html',
  styleUrls: ['./organization-list-page.component.scss']
})
export class OrganizationListPageComponent implements OnInit {

  // Faber app org id
  orgId: string;

  searched = false;
  bundle: fhir.r4.Bundle;
  dataSource = new MatTableDataSource<fhir.r4.BundleEntry>();

  length = 100;
  pageSize = 10;
  pageIndex = 0;

  pageSizeOptions = [this.pageSize];
  selectedOrganization: fhir.r4.Organization;
  public searchParams: FormGroup;
  orgName = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;


  BIG_DEF_COLUMNS: string[] = [
    'name',
    'type',
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
    this.route.parent.parent.params.subscribe((p) => {
      this.initOrg(p.orgId);
    });
  }

  initOrg(orgId) {
    this.orgId = orgId;
    this.organizationService.findOne(this.orgId).subscribe((o) => {
      this.orgName = o.name;
      const query = {
        type: this.orgId + '/default/Organization',
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
          const queryOrganizations = {...query};
          queryOrganizations.query = {...query.query};
          if (terms.name) {
            queryOrganizations.query.name = terms.name;
          }
          this.fhirHttpService.search(queryOrganizations).then(response => {
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
    this.selectedOrganization = undefined;
  }


  selectRow(row: fhir.r4.BundleEntry) {
    const selection = row.resource;
    const readObj = {type: this.orgId + '/default/Organization', id: selection.id};
    this.fhirHttpService.read(readObj).then(response => {
      this.selectedOrganization = response.data;
    });
  }

  viewOrganization(row: fhir.r4.BundleEntry) {
    this.router.navigate(['/org/' + this.orgId + '/clinical/organization/' + row.resource.id]);
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
}
