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
  selector: 'app-show-database-view',
  templateUrl: './show-database-view.component.html',
  styleUrls: ['./show-database-view.component.scss']
})
export class ShowDatabaseViewComponent implements AfterViewInit {

  databaseForm: FormGroup;
  databaseName: string;
  databaseId: string;
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
    this.initData();
  }

  initData() {
    this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        this.superAdminService.findOneDatabase(id).subscribe(database => {
            this.databaseName = database.name;
            this.databaseId = database.databaseId;

            this.databaseForm.patchValue(database);
            this.cdRef.detectChanges();

          },
          (err) => this.uxMessageService.handleError(err)
        );
      }
    );
  }

  initForm() {
    this.databaseForm = this.fb.group({
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
    const formValue = this.databaseForm.value;
    const updateDatabaseDto = new UpdateDatabaseDto();
    updateDatabaseDto.databaseId = this.databaseId;
    updateDatabaseDto.databaseHost = formValue.databaseHost;
    updateDatabaseDto.databasePort = formValue.databasePort;
    updateDatabaseDto.databaseUsername = formValue.databaseUsername;
    updateDatabaseDto.encryptedPassword = formValue.encryptedPassword;
    updateDatabaseDto.name = formValue.name;
    updateDatabaseDto.description = formValue.description;

    this.superAdminService.updateDatabase(updateDatabaseDto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Database saved');
        setTimeout(() => {
          this.router.navigate(['superadmin', 'clients', 'databases']);
        }, 500);
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  back() {
    window.history.back();
  }

}
