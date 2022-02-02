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
  UpdateDatabaseDto,
  UpdateClientDto, RegisterDatabaseDto
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';


@Component({
  selector: 'app-add-database-view',
  templateUrl: './add-database-view.component.html',
  styleUrls: ['./add-database-view.component.scss']
})
export class AddDatabaseViewComponent implements AfterViewInit {

  databaseForm: FormGroup;
  /**
   * True when sending information to the server
   */
  processing = false;

  /**
   * when the connection was tested
   */
  validated = false;

  constructor(private fb: FormBuilder, private router: Router,
              private superAdminService: SuperAdminService,
              private route: ActivatedRoute,
              private uxMessageService: UXMessageService, public dialog: MatDialog,
              private cdRef: ChangeDetectorRef) {
    this.initForm();
    this.initData();
  }

  ngAfterViewInit(): void {

  }

  initData() {
  }

  initForm() {
    this.databaseForm = this.fb.group({
      databaseId: '',
      name: '',
      description: '',
      databaseUsername: '',
      databaseHost: '',
      databasePort: '',
      driverClassName: '',
      encryptedPassword: '',
    });
  }



  onSubmitForm() {
    const registerDatabaseDto = this.getDto();
    this.superAdminService.registerDatabase(registerDatabaseDto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Database registered');
        this.router.navigate(['superadmin', 'clients', 'databases']);
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  testConnection() {
    this.superAdminService.testDatabaseConnection(this.getDto()).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Connection validated');
        this.validated = true;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  getDto(): RegisterDatabaseDto {
    const formValue = this.databaseForm.value;
    const registerDatabaseDto = new RegisterDatabaseDto();
    registerDatabaseDto.databaseId = formValue.databaseId;
    registerDatabaseDto.databaseHost = formValue.databaseHost;
    registerDatabaseDto.databasePort = formValue.databasePort;
    registerDatabaseDto.databaseUsername = formValue.databaseUsername;
    registerDatabaseDto.encryptedPassword = formValue.encryptedPassword;
    registerDatabaseDto.driverClassName  = formValue.driverClassName ;
    registerDatabaseDto.name = formValue.name;
    registerDatabaseDto.description = formValue.description;
    return registerDatabaseDto;
  }

  back() {
    window.history.back();
  }

}
