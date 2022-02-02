import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../domain/services/ContactService';
import {AddContactDto} from '../../domain/dtos/general/AddContactDto';
import {OrgContactSlugDto} from '../../domain/dtos/general/OrgContactSlugDto';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactViewComponent {

  addContactForm: FormGroup;
  errorMessage: string;
  @Input()
  orgId: string;

  constructor(private fb: FormBuilder, private contactService: ContactService, private uxMessageService: UXMessageService) {
    this.initForm();
  }

  initForm() {
    this.addContactForm = this.fb.group({
      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  onSubmitForm() {
    this.errorMessage = '';
    const formValue = this.addContactForm.value;
    const contact = new AddContactDto();
    const id = new OrgContactSlugDto();
    id.organizationId = this.orgId;
    id.contactId = formValue.id;
    contact.id = id;
    contact.firstname = formValue.firstname;
    contact.lastname = formValue.lastname;
    this.contactService.addContact(contact).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Contact added');
        //
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  close() {

  }

}
