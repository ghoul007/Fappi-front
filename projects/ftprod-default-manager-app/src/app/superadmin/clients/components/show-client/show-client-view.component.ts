import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {
  ClientResource,
  ClientSlug,
  ClientStatus,
  ConfirmCreateClientCommand,
  Personalization,
  SetClientPersonalizationDto,
  SuperAdminService,
  UpdateClientDto
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';


@Component({
  selector: 'app-show-client-view',
  templateUrl: './show-client-view.component.html',
  styleUrls: ['./show-client-view.component.scss']
})
export class ShowClientViewComponent implements AfterViewInit {

  clientForm: FormGroup;
  clientPersonalizationForm: FormGroup;
  clientName: string;
  clientId: ClientSlug;
  client: ClientResource;
  created: boolean;

  /**
   * True when sending information to the server
   */
  processing = false;

  constructor(private fb: FormBuilder, private router: Router,
              private superAdminService: SuperAdminService,
              private route: ActivatedRoute,
              private uxMessageService: UXMessageService, public dialog: MatDialog,
              private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.initForm();
    this.initFormPersonalization();
    this.initData();
  }

  initData() {
    this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        this.superAdminService.findOne(id).subscribe(client => {
            this.client = client;
            this.clientName = client.name;
            this.clientId = client.slug;
            this.clientForm.patchValue(client);


            this.created = this.client.status === ClientStatus.CREATED;

            this.clientPersonalizationForm.patchValue({
              colorScheme: client.personalization.colorScheme,
              customCss: client.personalization.customCss,
              poweredByText: client.personalization.poweredByText,
              logo: client.personalization.logo.id
            });

            this.cdRef.detectChanges();

          },
          (err) => this.uxMessageService.handleError(err)
        );
      }
    );
  }


  initForm() {
    this.clientForm = this.fb.group({
      name: '',
      description: '',
      groupEnabled: false,
      organizationEnabled: false,
      domain: '',
      defaultUrl: '',
    });
  }

  initFormPersonalization() {
    this.clientPersonalizationForm = this.fb.group({
      colorScheme: '',
      customCss: '',
      poweredByText: '',
    });
  }


  onSubmitForm() {
    const formValue = this.clientForm.value;
    const updateClientDto = new UpdateClientDto();
    updateClientDto.clientSlug = this.clientId;
    updateClientDto.name = formValue.name;
    updateClientDto.description = formValue.description;
    updateClientDto.groupEnabled = formValue.groupEnabled;
    updateClientDto.organizationEnabled = formValue.organizationEnabled;
    updateClientDto.domain = formValue.domain;
    updateClientDto.defaultUrl = formValue.defaultUrl;

    this.superAdminService.update(updateClientDto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Client saved');
        setTimeout(() => {
          this.router.navigate(['superadmin', 'clients']);
        }, 500);
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  onSubmitFormPersonalization() {
    this.processing = true;
    const formValue = this.clientPersonalizationForm.value;
    const setClientPersonalizationDto = new SetClientPersonalizationDto();
    const perso = new Personalization();
    setClientPersonalizationDto.clientSlug = this.clientId;
    setClientPersonalizationDto.personalization = perso;
    perso.colorScheme = formValue.colorScheme;
    perso.customCss = formValue.customCss;
    perso.poweredByText = formValue.poweredByText;
    this.superAdminService.setPersonalization(setClientPersonalizationDto).subscribe((ret) => {
        this.processing = false;
        this.uxMessageService.handleSuccess('Custom saved');
      },
      (err) => {
        this.processing = false;
        this.uxMessageService.handleError(err);
      }
    );
  }

  forceConfirm() {
    this.processing = true;
    const confirmCreateClientCommand: ConfirmCreateClientCommand = new ConfirmCreateClientCommand();
    confirmCreateClientCommand.clientSlug = this.clientId;
    this.superAdminService.confirmCreateClient(confirmCreateClientCommand).subscribe((ret) => {
        this.processing = false;
        this.uxMessageService.handleSuccess('Confirm send');
        setTimeout(() => window.location = window.location, 2000);
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
