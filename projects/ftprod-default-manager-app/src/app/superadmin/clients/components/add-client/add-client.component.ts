import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UXMessageService} from 'fappi-ng-material-kit';
import {ClientSlug, CreateClientDto, SuperAdminService} from 'fappi-common-model';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientViewComponent implements AfterViewInit {

  addClientForm: FormGroup;
  rendered = false;
  /**
   * True when sending information to the server
   */
  processing = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private uxMessageService: UXMessageService,
              private superAdminService: SuperAdminService,
              private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.initForm();
  }

  initForm() {
    this.addClientForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      id: ['', Validators.required]
    });
    this.rendered = true;
    this.cdRef.detectChanges();
  }

  onSubmitForm() {
    this.processing = true;
    const formValue = this.addClientForm.value;
    const clientDto = new CreateClientDto();
    clientDto.name = formValue.name;
    clientDto.description = formValue.description;
    clientDto.clientSlug = new ClientSlug(formValue.id);
    this.superAdminService.create(clientDto).subscribe((ret) => {
        this.processing = false;
        this.uxMessageService.handleSuccess('Client added');
        setTimeout(() => {
          this.router.navigate(['superadmin', 'clients', 'edit', ret.clientSlug.name]);
        }, 2000);
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
