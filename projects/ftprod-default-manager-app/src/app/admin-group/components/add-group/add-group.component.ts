import {AfterViewInit, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AddGroupDto, GroupId, GroupService, GUID, Organization, OrganizationService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupViewComponent implements AfterViewInit {

  addGroupForm: FormGroup;
  organizations: Organization[];
  errorMessage: string;
  selectedOrganizationId: string;
  showManualId = false;
  createProtected = false;
  /**
   * True when sending information to the server
   */
  processing = false;


  constructor(private fb: FormBuilder, private groupService: GroupService, private organizationService: OrganizationService,
              private router: Router, private route: ActivatedRoute, private uxMessageService: UXMessageService) {
  }

  ngAfterViewInit(): void {
    this.selectedOrganizationId = this.route.parent.parent.snapshot.params.orgId;
    this.initForm();
  }

  initForm() {
    this.organizationService.findAll().subscribe(orgs => {
        this.organizations = orgs;
        this.addGroupForm = this.fb.group({
          name: ['', Validators.required],
          id: [''],
        });

      },
      (err) => this.uxMessageService.handleError(err)
    );


  }

  onSubmitForm() {
    this.processing = true;
    this.errorMessage = '';

    const formValue = this.addGroupForm.value;
    const group = new AddGroupDto();
    group.name = formValue.name;
    const groupId = new GroupId();
    if (this.showManualId) {
     groupId.id = formValue.id;
    } else {
      groupId.id = GUID.getNewGUIDString();
    }
    groupId.organizationId = this.selectedOrganizationId;
    group.groupId = groupId;


    if (!this.createProtected) {
      this.groupService.addGroup(group).subscribe((ret) => {
          this.processing = false;
          this.uxMessageService.handleSuccess('Group added');
          this.router.navigate(['/org', this.selectedOrganizationId, 'admin', 'groups', 'edit', ret.id.id]);
        },
        (err) => {
          this.processing = false;
          this.uxMessageService.handleError(err);
        }
      );
    } else {
      this.groupService.addGroupProtected(group).subscribe((ret) => {
          this.processing = false;
          this.uxMessageService.handleSuccess('Group added');
          this.router.navigate(['/org', this.selectedOrganizationId, 'admin', 'groups', 'edit', ret.id.id]);
        },
        (err) => {
          this.processing = false;
          this.uxMessageService.handleError(err);
        }
      );
    }

  }

  back() {
    window.history.back();
  }


}
