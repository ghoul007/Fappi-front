import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  NodeResource, OrganizationIdDto,
  OrganizationService,
  SiteService,
  TaskService,
  UpdateOrganizationInformationsDto,
  UpdateSiteDto, UserResource
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';
import {SelectUserDialog} from '../../../../../../../ftprod-default-manager-app/src/app/main-components/dialogs/select-user.dialog';

export class Language {
  constructor(public code: string, public label: string) {
  }
}


@Component({
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {


  organizationForm: FormGroup;
  id: string;
  name: string;
  validationState: string;
  languages: Language[];
  hrefClient = '';
  hrefClientAdmin = '';
  /**
   * True when sending information to the server
   */
  processing = false;
  clientConfigNode: NodeResource;
  token = '';

  constructor(private fb: FormBuilder, private organizationService: OrganizationService, private router: Router,
              private route: ActivatedRoute, private uxMessageService: UXMessageService, public dialog: MatDialog,
              private siteService: SiteService) {
    this.initForm();
    this.initData();

    this.languages = [
      new Language('en', 'English'),
      new Language('fr', 'Francais'),
      new Language('de', 'German')
    ];
  }

  initData() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.hrefClient = 'https://' + window.location.host + '/smart-brain-front/' + this.id + '/question-choice?token=';
      this.hrefClientAdmin = 'https://' + window.location.host + '/smart-brain-admin/org/' + this.id + '/admin/users';
      this.organizationService.findOne(this.id).subscribe(org => {
          this.name = org.name;
          this.validationState = org.validationState;
          this.organizationForm.patchValue(org);
        },
        (err) => this.uxMessageService.handleError(err)
      );
      this.initClientForm();
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


  initClientForm() {
    this.siteService.findOneNode('default', this.id, '/offre-client/offre').subscribe((nodeRoot) => {
      this.clientConfigNode = nodeRoot;
      this.token = nodeRoot.properties.security_token;
    });
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
    const dialogRef = this.dialog.open(SelectUserDialog, {
      width: '450px', data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.organizationService.addMember(this.id, result.username).subscribe(() => {
            this.uxMessageService.handleSuccess('Member added');
            setTimeout(() => window.location.href = window.location.href, 500);
          },
          (err) => this.uxMessageService.handleError(err)
        );
      }
    });
  }


  onSettingSaved() {
    this.initClientForm();
    this.uxMessageService.handleSuccess('Saved');
  }

    /*
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
    });*/



  removeMember($event) {
    this.organizationService.removeMember(this.id, $event.username).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Member removed');
        window.location.href = window.location.href;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  selectMember(user: UserResource) {
    this.router.navigate(['org', 'default', 'clients', 'edit', this.id, 'users', 'edit', user.id]);
  }

  back() {
    window.history.back();
  }





  /*



  siteForm: FormGroup;

  // the site id
  slug: string;
  name: string;
  orgId: string;

  token = '';

  selectedNode: NodeResource;
  clientConfigNode: NodeResource;

  languages: Language[];

  processing = false;

  constructor(private fb: FormBuilder, private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService,
              private taskService: TaskService, public dialog: MatDialog) {
    this.initForm();
    this.initData();
    this.initClientForm();

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
      this.slug = params.get('slug');
      this.orgId = this.route.parent.parent.snapshot.params.orgId;
      this.siteService.findOne(this.route.parent.parent.snapshot.params.orgId, this.slug).subscribe(site => {
          this.slug = site.id.elementId;
          this.name = site.name;
          this.siteForm.patchValue(site);

        },
        (err) => this.uxMessageService.handleError(err)
      );
    });
  }

  initForm() {
    this.siteForm = this.fb.group({});
  }

  initClientForm() {
    this.siteService.findOneNode(this.orgId, this.slug, '/offre-client/offre').subscribe((nodeRoot) => {
      this.clientConfigNode = nodeRoot;
      this.token = nodeRoot.properties.security_token;
    });
  }


  onSubmitForm() {
    const formValue = this.siteForm.value;
    const site = new UpdateSiteDto();
    site.id.organizationId = this.orgId;
    site.id.elementId = this.slug;
    this.siteService.updateSite(site).subscribe((ret) => {
        this.router.navigate(['/sites']);
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }


  onNodeSelected(node: NodeResource) {
    this.selectedNode = node;
  }

  back() {
    window.history.back();
  }
*/
}
