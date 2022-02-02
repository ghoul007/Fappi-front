import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
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
  UpdateDatabaseDto,
  UpdateClientDto, RegisterDatabaseDto, SetDatabaseConfigurationDto, DatabaseResource, InitDatabaseDto
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';


@Component({
  selector: 'app-set-client-database',
  templateUrl: './set-client-database.component.html',
  styleUrls: ['./set-client-database.component.scss']
})
export class SetClientDatabaseComponent implements AfterViewInit {

  databaseForm: FormGroup;

  databases: DatabaseResource[] = [];
  clientId: string;

  @Output()
  onGoEncryption: EventEmitter<void> = new EventEmitter<void>();

  /**
   * True when sending information to the server
   */
  processing = false;
  clientStatus: string;


  constructor(private fb: FormBuilder, private router: Router,
              private superAdminService: SuperAdminService,
              private route: ActivatedRoute,
              private uxMessageService: UXMessageService, public dialog: MatDialog,
              private cdRef: ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {
    this.initDbList();
    this.initForm();
  }

  initForm() {
    this.databaseForm = this.fb.group({
      adminDatabase: '',
      cmsDatabase: '',
      fhirDatabase: '',
      encryptionActivated: 'false',
      encryptionKey: '',
      encryptionAlgorithm: ''
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.refreshFromServer(id);
    });
  }

  refreshFromServer(id: string) {
    this.superAdminService.findOne(id).subscribe(client => {
        this.clientId = client.slug.name;
        this.clientStatus = client.status;
        this.databaseForm.patchValue({
          adminDatabase: client.adminDatabaseId,
          cmsDatabase: client.cmsDatabaseId
        });
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  initDbList() {
    this.superAdminService.findAllDatabases().subscribe((clients) => {
        this.databases = clients.content;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }


  onSubmitForm() {
    const formValue = this.databaseForm.value;
    const setDatabaseConfigurationDto = new SetDatabaseConfigurationDto();
    setDatabaseConfigurationDto.clientSlug = new ClientSlug();
    setDatabaseConfigurationDto.clientSlug.name = this.clientId;
    setDatabaseConfigurationDto.adminDatabase = formValue.adminDatabase;
    setDatabaseConfigurationDto.cmsDatabase = formValue.cmsDatabase;
    setDatabaseConfigurationDto.fhirDatabase = formValue.fhirDatabase;

    this.superAdminService.setClientDatabaseConfiguration(setDatabaseConfigurationDto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Database configuration saved');
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }


  initDatabase() {
    const initDatabaseDto = new InitDatabaseDto();
    initDatabaseDto.clientSlug = new ClientSlug();
    initDatabaseDto.clientSlug.name = this.clientId;
    this.superAdminService.initClientDatabase(initDatabaseDto).subscribe((ret) => {
      this.uxMessageService.handleSuccess('Database initialized');
    },
      (err) => this.uxMessageService.handleError(err));
  }

  goToEncryption() {
    this.onGoEncryption.emit();
  }



  back() {
    this.refreshFromServer(this.clientId);
  }

}
