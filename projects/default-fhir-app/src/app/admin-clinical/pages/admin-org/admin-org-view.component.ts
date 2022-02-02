import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {OrganizationService,} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';

@Component({
  templateUrl: './admin-org-view.component.html',
  styleUrls: ['./admin-org-view.component.scss']
})
export class AdminOrgViewComponent {

  fhirOrgForm: FormGroup;
  id: string;
  name: string;

  /**
   * True when sending information to the server
   */
  processing = false;

  constructor(private fb: FormBuilder, private organizationService: OrganizationService, private router: Router,
              private route: ActivatedRoute, private uxMessageService: UXMessageService, public dialog: MatDialog) {
    this.initForm();
    this.initData();
  }

  initData() {
    this.route.paramMap.subscribe(params => {
      this.id = this.route.parent.parent.snapshot.params.orgId;
      this.organizationService.findOne(this.id).subscribe(org => {
          this.name = org.name;
          this.fhirOrgForm.patchValue(org);
        },
        (err) => this.uxMessageService.handleError(err)
      );
    });
  }

  initForm() {
    this.fhirOrgForm = this.fb.group({
      name: '',
      fhirServerBaseUrl: '',
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmitForm() {
    this.uxMessageService.handleSuccess('Demo mode, cant save configuration');
    /*    this.processing = true;
        const formValue = this.fhirOrgForm.value;
        const organization = new UpdateOrganizationInformationsDto(
          new OrganizationIdDto(this.id),
          formValue.defaultLanguage,
          formValue.description,
          formValue.email,
          formValue.faxNumber,
          formValue.phoneNumber
        );
        this.organizationService.updateOrganization(organization).subscribe((ret) => {
            this.processing = false;
            this.uxMessageService.handleSuccess('Organization saved');
          },
          (err) => {
            this.processing = false;
            this.uxMessageService.handleError(err);
          }
        );*/
  }


  back() {
    window.history.back();
  }

}
