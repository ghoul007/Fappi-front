import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {
  ClientResource,
  ClientSlug,
  ClientStatus,
  MediaId,
  Personalization,
  SetClientPersonalizationDto,
  SuperAdminService
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {FileChooserComponent} from 'fappi-ng-media';


@Component({
  selector: 'app-edit-personalization',
  templateUrl: './edit-personalization.component.html',
  styleUrls: ['./edit-personalization.component.scss']
})
export class EditPersonalizationComponent implements AfterViewInit {

  clientPersonalizationForm: FormGroup;
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
    this.initFormPersonalization();
    this.initData();
  }

  initData() {
    this.superAdminService.findCurrent().subscribe(client => {
        this.client = client;
        this.clientId = client.slug;
        this.created = this.client.status === ClientStatus.CREATED || client.name === 'fappi-admin';
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

  initFormPersonalization() {
    this.clientPersonalizationForm = this.fb.group({
      colorScheme: '',
      customCss: '',
      poweredByText: '',
      logo: ''
    });
  }

  chooseFile() {
    const dialogRef = this.dialog.open(FileChooserComponent, {
      width: '650px', data: {orgId: 'public'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.clientPersonalizationForm.controls.logo.patchValue(result.media.id);
    });
  }

  removeFile() {
    this.clientPersonalizationForm.controls.logo.patchValue(null);
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
    if (formValue.logo) {
      perso.logo = new MediaId();
      perso.logo.orgId = 'public';
      perso.logo.id = formValue.logo;
    }
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

  cancel() {
    this.initData();
  }

}
