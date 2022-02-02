import {AfterViewInit, ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {
  ClientSlug,
  SuperAdminService,
   AddCryptoConfigDto
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';


@Component({
  selector: 'app-add-encryption-config',
  templateUrl: './add-encryption-config.component.html',
  styleUrls: ['./add-encryption-config.component.scss']
})
export class AddEncryptionConfigComponent implements AfterViewInit {

  @Input()
  clientId: string;

  encryptionConfigForm: FormGroup;
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
  }

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clientId = params.get('id');
    });
  }

  initForm() {
    this.encryptionConfigForm = this.fb.group({
      id: '',
      algorithm: '',
      encrypKey: '',
      decrypSecretKey: '',
      salt: '',
    });
  }



  onSubmitForm() {
    const addCryptoConfigDto = this.getDto();
    this.superAdminService.addCryptoConfig(addCryptoConfigDto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Crypto config saved');
        this.router.navigate(['superadmin', 'clients', 'edit', this.clientId]);
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  getDto(): AddCryptoConfigDto {
    const formValue = this.encryptionConfigForm.value;
    const clientSlug = new ClientSlug();
    clientSlug.name = this.clientId;
    const addCryptoConfigDto = new AddCryptoConfigDto();
    addCryptoConfigDto.id = formValue.id;
    addCryptoConfigDto.algorithm = formValue.algorithm;
    addCryptoConfigDto.encrypKey = formValue.encrypKey;
    addCryptoConfigDto.decrypSecretKey = formValue.decrypSecretKey;
    addCryptoConfigDto.salt = formValue.salt;
    addCryptoConfigDto.clientSlug  = clientSlug ;
    return addCryptoConfigDto;
  }

  back() {
    window.history.back();
  }

}
