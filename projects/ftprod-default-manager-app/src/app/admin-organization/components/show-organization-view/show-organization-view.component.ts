import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Language} from '../../../admin-user/components/edit-user/edit-user.component';
import {
  ConfirmDeleteGroupDto, ConfirmDeleteOrganizationDto, DeleteOrganizationDto,
  OrganizationIdDto,
  OrganizationService,
  UpdateOrganizationInformationsDto,
  UserResource
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';
import {AddOrgMemberComponent} from './dialogs/add-org-member.component';

@Component({
  templateUrl: './show-organization-view.component.html',
  styleUrls: ['./show-organization-view.component.scss']
})
export class ShowOrganizationViewComponent {

  organizationForm: FormGroup;
  id: string;
  name: string;
  validationState: string;
  languages: Language[];
  deleted = false;
  organizationIdDto: OrganizationIdDto;
  /**
   * True when sending information to the server
   */
  processing = false;

  constructor(private fb: FormBuilder, private organizationService: OrganizationService, private router: Router,
              private route: ActivatedRoute, private uxMessageService: UXMessageService, public dialog: MatDialog) {
    this.initForm();
    this.initData();
    this.languages = [
      new Language('en', 'English'),
      new Language('fr', 'Francais'),
      new Language('de', 'German'),
      new Language('it', 'Italian'),
      new Language('es', 'Spanish'),
      new Language('zh', 'Chinese'),
      new Language('ar', 'Arabic'),
    ];
  }

  initData() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.organizationService.findOne(this.id).subscribe(org => {
          this.organizationIdDto = org.id;
          this.name = org.name;
          this.validationState = org.validationState;
          this.organizationForm.patchValue(org);
          this.deleted = org.deleted;
        },
        (err) => this.uxMessageService.handleError(err)
      );
    });
  }

  initForm() {
    this.organizationForm = this.fb.group({
      name: '',
      defaultLanguage: '',
      description: '',
      email: ['', Validators.email],
      faxNumber: '',
      phoneNumber: ''
    });
  }

  onSubmitForm() {
    this.processing = true;
    const formValue = this.organizationForm.value;
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
    );
  }

  askForValidation() {
    this.organizationService.askForValidation(this.id).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Validation request sent');
        this.initData();
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }


  addMember() {
    const dialogRef = this.dialog.open(AddOrgMemberComponent, {
      width: '450px',
      data: {
        orgId: this.id,
        member: null as UserResource
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.organizationService.addMember(this.id, result.member).subscribe((ret) => {
            this.uxMessageService.handleSuccess('Member added saved');
            // refresh
            window.location.href = window.location.href;
          },
          (err) => this.uxMessageService.handleError(err)
        );
      }
    });
  }


  removeMember($event) {
    this.organizationService.removeMember(this.id, $event.username).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Member removed');
        window.location.href = window.location.href;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }



  delete() {
    const deleteOrganizationDto = new DeleteOrganizationDto(this.organizationIdDto);
    this.organizationService.deleteOrganization(deleteOrganizationDto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Organization deleted');
      },
      (err) => this.uxMessageService.handleError(err));
  }

  confirmDelete() {
    const confirmDeleteOrganizationDto = new ConfirmDeleteOrganizationDto(this.organizationIdDto);
    this.organizationService.confirmDeleteOrganization(confirmDeleteOrganizationDto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Organization permanently deleted');
      },
      (err) => this.uxMessageService.handleError(err));
  }

  back() {
    window.history.back();
  }

}
