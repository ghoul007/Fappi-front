import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UXMessageService} from 'fappi-ng-material-kit';
import {LanguageResource, UpdateUserInformationsDto, UserIdDto, UserService} from 'fappi-common-model';
import {SetUserLanguageDto} from '../../../../../../fappi-common-model/src/lib/domain/user/command/SetUserLanguageDto';

export class Language {
  constructor(public code: string, public label: string) {
  }
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserViewComponent {

  userForm: FormGroup;
  languages: Language[];
  /**
   * True when sending information to the server
   */
  processing = false;
  organizationId: string;
  oldLanguage: string;

  @Output()
  langSaved: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,
              private route: ActivatedRoute, private uxMessageService: UXMessageService) {
    this.initForm();

    this.languages = [
      new Language('en', 'English'),
      new Language('fr', 'Francais'),
      new Language('de', 'German'),
      new Language('it', 'Italian'),
      new Language('es', 'Spanish'),
      new Language('zh', 'Chinese'),
      new Language('ar', 'Arabic'),
    ];

    this.route.paramMap.subscribe(params => {
      this.organizationId = this.route.parent.parent.snapshot.params.orgId;
    });
  }

  private _username: string;

  get username(): string {
    return this._username;
  }

  @Input()
  set username(u: string) {
    if (this._username === u) {
      return;
    }
    this._username = u;
    this.initData();
  }

  initForm() {
    this.userForm = this.fb.group({
      firstName: '',
      lastName: '',
      preferredEmail: ['', Validators.email],
      language: [''],
    });
  }

  initData() {
    this.userService.findOne(this.username).subscribe(user => {
        this.username = user.username;
        this.oldLanguage = user.languageResource.code;
        this.userForm.patchValue(user);
        this.userForm.patchValue({language: user.languageResource.code});
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }


  onSubmitForm() {
    this.processing = true;
    const formValue = this.userForm.value;
    const user = new UpdateUserInformationsDto();
    const userIdDto: UserIdDto = new UserIdDto();
    userIdDto.username = this.username;
    user.userId = userIdDto;
    user.firstName = formValue.firstName;
    user.lastName = formValue.lastName;
    user.preferredEmail = formValue.preferredEmail;


    this.userService.updateUser(user).subscribe((ret) => {
        this.processing = false;
        this.uxMessageService.handleSuccess('User updated');
        this.router.navigate(['org', this.organizationId, 'admin', 'users']);
      },
      (err) => {
        this.processing = false;
        this.uxMessageService.handleError(err);
      }
    );
  }

  onLangageChange() {
    const formValue = this.userForm.value;
    if (this.oldLanguage !== formValue.language && formValue.language !== '') {
      this.oldLanguage = formValue.language;
      this.processing = true;
      const userIdDto: UserIdDto = new UserIdDto();
      userIdDto.username = this.username;
      const userLanguageDto = new SetUserLanguageDto();
      userLanguageDto.userId = userIdDto;
      userLanguageDto.languageResource = new LanguageResource();
      userLanguageDto.languageResource.code = formValue.language;
      this.userService.setUserLanguage(userLanguageDto).subscribe((ret) => {
          this.processing = false;
          this.langSaved.emit(formValue.language);
          this.uxMessageService.handleSuccess('Language updated');
        },
        (err) => {
          this.processing = false;
          this.uxMessageService.handleError(err);
        });
    }
  }

  back() {
    window.history.back();
  }


}
