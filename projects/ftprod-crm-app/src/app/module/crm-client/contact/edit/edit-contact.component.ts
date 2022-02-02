import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../domain/services/ContactService';
import {AddContactDto} from '../../domain/dtos/general/AddContactDto';
import {ContactResource} from '../../domain/model/ContactResource';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactViewComponent {

  editContactForm: FormGroup;
  errorMessage: string;
  @Input()
  orgId: string;
  @Input('contact')
  contact: ContactResource;

  editing = false;

  constructor(private fb: FormBuilder, private contactService: ContactService, private uxMessageService: UXMessageService) {
    this.initForm();
  }

  initForm() {
    this.editContactForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  onSubmitForm() {
    this.errorMessage = '';
    const formValue = this.editContactForm.value;
    const contact = new AddContactDto();
    contact.firstname = formValue['firstname'];
    contact.lastname = formValue['lastname'];
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
