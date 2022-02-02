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
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {


  searched = false;
  bundle: fhir.r4.Bundle;
  dataSource = new MatTableDataSource<fhir.r4.BundleEntry>();

  length = 100;
  pageSize = 10;
  pageIndex = 0;

  pageSizeOptions = [this.pageSize];
  public searchParams: FormGroup;

  selectedPatient: fhir.r4.Patient;

  selectedOrganizationId: string;
  orgName = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;


  BIG_DEF_COLUMNS: string[] = [
    'familyNameCol',
    'givenNamesCol',
    'nirCol',
    'birthDateCol',
    'addressLinesCol',
    'addressCityCol',
    'actionsCol'
  ];
  SMALL_DEF_COLUMNS: string[] = [
    'familyNameCol',
    'nirCol',
    'actionsCol'
  ];

  displayedColumns: string[] = [];


  constructor(private organizationService: OrganizationService, private router: Router,
              private route: ActivatedRoute, private fhirHttpService: FhirJsHttpService, private fb: FormBuilder,
              private breakpointObserver: BreakpointObserver) {

    this.searchParams = this.fb.group({
      name: new FormControl(''),
      nir: new FormControl(''),
      ipp: new FormControl(''),
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
        type: this.selectedOrganizationId + '/default/Patient',
        query: {
          _count: this.pageSize,
          _summary: 'true',
          _sort: 'family',
        },
      } as QueryObj;

      this.searchParams.valueChanges
        .pipe(
          debounceTime(400),
          distinctUntilChanged()
        )
        .subscribe(terms => {
          const queryPatients = {...query};
          queryPatients.query = {...query.query};
          if (terms.name) {
            queryPatients.query.name = terms.name;
          }
          if (terms.nir) {
            queryPatients.query.identifier = terms.nir;
          }
          if (terms.ipp) {
            queryPatients.query.identifier = terms.ipp;
          }
          this.fhirHttpService.search(queryPatients).then(response => {
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
    this.selectedPatient = undefined;
  }


  getPatientFamilyName(entry: fhir.r4.BundleEntry): string {
    const patient = entry.resource as fhir.r4.Patient;
    if (patient.name && patient.name.length > 0 && patient.name[0].family) {
      return patient.name[0].family;
    }
    return '';
  }

  getPatientGivenNames(entry: fhir.r4.BundleEntry): string {
    const patient = entry.resource as fhir.r4.Patient;
    if (patient.name && patient.name.length > 0 && patient.name[0].given) {
      return (entry.resource as fhir.r4.Patient).name[0].given.join(' ');
    }
    return '';
  }

  getPatientBirthDate(entry: fhir.r4.BundleEntry): string {
    const patient = entry.resource as fhir.r4.Patient;
    if (patient.birthDate) {
      return patient.birthDate;
    }
    return '';
  }

  getPatientAddressLines(entry: fhir.r4.BundleEntry): string {
    const patient = entry.resource as fhir.r4.Patient;
    if (
      patient.address &&
      patient.address.length > 0 &&
      patient.address[0].line
    ) {
      return patient.address[0].line.join(', ');
    }
    return '';
  }

  getPatientNir(entry: fhir.r4.BundleEntry): string {
    const patient = entry.resource as fhir.r4.Patient;
    if (patient.identifier) {
      const nir = patient.identifier.find((id) => id.type?.coding[0]?.code === 'nir');
      if (nir) {
        return nir.value;
      } else {
        return '-';
      }
    }
    return '';
  }

  getPatientAddressCity(entry: fhir.r4.BundleEntry): string {
    const patient = entry.resource as fhir.r4.Patient;
    if (
      patient.address &&
      patient.address.length > 0 &&
      patient.address[0].city
    ) {
      return patient.address[0].city;
    }
    return '';
  }

  selectRow(row: fhir.r4.BundleEntry) {
    const selection = row.resource;
    const readObj = {type: 'Patient', id: selection.id};
    this.fhirHttpService.read(readObj).then(response => {
      this.selectedPatient = response.data;
    });
  }

  viewPatient(row: fhir.r4.BundleEntry) {
    this.router.navigate(['/org/' + this.selectedOrganizationId + '/clinical/patient/' + row.resource.id]);
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
