import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AddUserDto, Organization, OrganizationService, UserId, UserService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserViewComponent {

  addUserForm: FormGroup;
  errorMessage: string;
  orgId: string;
  /**
   * True when sending information to the server
   */
  processing = false;

  constructor(private fb: FormBuilder, private userService: UserService, private organizationService: OrganizationService,
              private router: Router, private route: ActivatedRoute, private uxMessageService: UXMessageService) {
    this.initForm();
  }

  initForm() {
    this.addUserForm = this.fb.group({
      organizationId: ['', Validators.required],
      username: ['', Validators.required],
      temporary: [true]
    });
    this.route.paramMap.subscribe(params => {
      this.orgId = this.route.snapshot.params.orgId;
      this.addUserForm.patchValue({organizationId:  this.orgId});
    });
  }

  onSubmitForm() {
    this.processing = true;
    this.errorMessage = '';

    const formValue = this.addUserForm.value;
    const user = new AddUserDto();
    user.password = this.randomPasswordGenerate(8, 8);
    user.organizationId = formValue.organizationId;
    user.userId = new UserId(formValue.username);
    user.preferredEmail = formValue.username;
    user.temporaryPassword = true;
    this.userService.addUser(user).subscribe((ret) => {
        this.processing = false;
        this.uxMessageService.handleSuccess('User added');
        this.router.navigate(['org', 'default', 'clients', 'edit', this.orgId]);
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


  displayFn(organization?: Organization): string | undefined {
    return organization ? organization.name : undefined;
  }

  randomPasswordGenerate(max, min) {
    const passwordChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@!%&()/';
    const randPwLen = Math.floor(Math.random() * (max - min + 1)) + min;
    const randPassword = Array(randPwLen).fill(passwordChars).map((x) => {
      return x[Math.floor(Math.random() * x.length)];
    }).join('');
    return randPassword;
  }

}
