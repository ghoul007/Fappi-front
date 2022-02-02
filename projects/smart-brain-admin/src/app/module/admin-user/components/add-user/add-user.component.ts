import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AddUserDto, Organization, OrganizationService, UserId, UserInfoService, UserService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserViewComponent {

  addUserForm: FormGroup;
  organizations: Organization[];
  errorMessage: string;
  orgId: string;
  /**
   * True when sending information to the server
   */
  processing = false;

  constructor(private fb: FormBuilder, private userService: UserService, private organizationService: OrganizationService,
              private router: Router, private route: ActivatedRoute, private uxMessageService: UXMessageService,
              private userInfoService: UserInfoService) {
    this.initForm();

  }

  initForm() {

    this.userInfoService.hasRole(['ROLE_ADMIN']).subscribe((has) => {
      if (has) {
        this.organizationService.findAllAsAdmin(false).subscribe(orgs => {
          this.organizations = orgs;
          this.addUserForm = this.fb.group({
            organizationId: ['', Validators.required],
            username: ['', Validators.required],
            temporary: [true]
          });
          this.route.paramMap.subscribe(params => {
            const selected = this.organizations.find((o) => o.id.id === this.route.parent.parent.snapshot.params.orgId);
            this.addUserForm.patchValue({organizationId: selected});
          });
        });
      } else {
        this.organizationService.findAll().subscribe(orgs => {
            this.organizations = orgs;
            this.addUserForm = this.fb.group({
              organizationId: ['', Validators.required],
              username: ['', Validators.required],
              temporary: [true]
            });
            this.route.paramMap.subscribe(params => {
              const selected = this.organizations.find((o) => o.id.id === this.route.parent.parent.snapshot.params.orgId);
              this.addUserForm.patchValue({organizationId: selected});
            });
          },
          (err) => this.uxMessageService.handleError(err)
        );
      }
    });




  }

  onSubmitForm() {
    this.processing = true;
    this.errorMessage = '';

    const formValue = this.addUserForm.value;
    const user = new AddUserDto();
    user.password = this.randomPasswordGenerate(8, 8);
    user.organizationId = formValue.organizationId.id;
    user.userId = new UserId(formValue.username);
    user.temporaryPassword = true;
    user.preferredEmail = formValue.username;

    this.userService.addUser(user).subscribe((ret) => {
        this.processing = false;
        this.uxMessageService.handleSuccess('User added');
        // only admin car edit users so we search if the user is admin and if not we redirect to the user list.
        this.userInfoService
          .hasGroup( this.orgId, ['admin'])
          .subscribe(authorized => {
            if (authorized) {
              this.router.navigate(['org', user.organizationId.id, 'admin', 'users', 'edit', user.userId.username]);
            } else {
              this.router.navigate(['org', user.organizationId.id, 'admin', 'users']);
            }
          });
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
