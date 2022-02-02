import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AddRootOrganizationDto, GUID, OrganizationIdDto, OrganizationService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-organization-view',
  templateUrl: './add-organization-view.component.html',
  styleUrls: ['./add-organization-view.component.scss']
})
export class AddOrganizationViewComponent {


  createOrgForm: FormGroup;
  /**
   * True when sending information to the server
   */
  processing = false;

  constructor(private fb: FormBuilder, private organizationService: OrganizationService, private router: Router,
              private uxMessageService: UXMessageService) {
    this.createOrgForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmitForm() {
    this.processing = true;
    const formValue = this.createOrgForm.value;
    // @ts-ignore
    const organization = new AddRootOrganizationDto(
      formValue.name,
      new OrganizationIdDto(GUID.getNewGUIDString()),
      false
    );
    this.organizationService.addRootOrganization(organization).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Organization added');
        this.router.navigate(['org', ret.id.id, 'admin', 'organizations', 'edit', ret.id.id]);
      },
      (err) => {
        this.processing = false;
        this.uxMessageService.handleError(err);
      }
    );
  }

  back() {
    window.history.back();
  }


}
