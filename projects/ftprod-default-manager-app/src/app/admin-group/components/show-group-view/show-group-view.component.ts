import {AfterViewInit, Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddMemberComponent} from './dialogs/add-member.component';
import {
  AddMemberDto,
  ConfirmDeleteGroupDto,
  GroupId,
  GroupService,
  MemberId,
  RemoveMemberDto,
  UpdateGroupDto,
  UserResource
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {DeleteGroupDto} from "../../../../../../fappi-common-model/src/lib/domain/user/command/group/DeleteGroupDto";

@Component({
  selector: 'app-show-group-view',
  templateUrl: './show-group-view.component.html',
  styleUrls: ['./show-group-view.component.scss']
})
export class ShowGroupViewComponent implements AfterViewInit {

  groupForm: FormGroup;
  id: string;
  name: string;
  groupId: GroupId;
  protectedGroup: boolean;
  selectedOrganizationId: string;
  deleted = false;
  /**
   * True when sending information to the server
   */
  processing = false;

  constructor(private fb: FormBuilder, private groupService: GroupService, private router: Router,
              private route: ActivatedRoute, private uxMessageService: UXMessageService, public dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    this.selectedOrganizationId = this.route.parent.parent.snapshot.params.orgId;
    this.initForm();
    this.initData();
  }

  initData() {
    this.route.paramMap.subscribe(params => {
        this.id = params.get('id');
        this.groupService.findOne(this.selectedOrganizationId, this.id).subscribe(group => {
            this.name = group.name;
            this.groupId = group.groupId;
            this.protectedGroup = group.protectedGroup;
            this.deleted = group.deleted;
            this.groupForm.patchValue(group);
          },
          (err) => this.uxMessageService.handleError(err)
        );
      }
    );
  }

  initForm() {
    this.groupForm = this.fb.group({
      name: '',
    });
  }

  onSubmitForm() {
    this.processing = true;
    const formValue = this.groupForm.value;
    const group = new UpdateGroupDto();
    group.groupId = this.groupId;
    group.name = formValue.name;
    if ( this.protectedGroup ) {
      this.groupService.updateGroupProtected(group).subscribe((ret) => {
          this.processing = true;
          this.uxMessageService.handleSuccess('Group saved');
          this.router.navigate(['/org', this.selectedOrganizationId, 'admin', 'groups']);
        },
        (err) => {
          this.processing = false;
          this.uxMessageService.handleError(err);
        }
      );
    } else {
      this.groupService.updateGroup(group).subscribe((ret) => {
          this.processing = true;
          this.uxMessageService.handleSuccess('Group saved');
          this.router.navigate(['/org', this.selectedOrganizationId, 'admin', 'groups']);
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


  addMember() {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      width: '450px',
      data: {
        orgId: this.selectedOrganizationId,
        member: null as UserResource
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const addMemberDto = new AddMemberDto();
        addMemberDto.groupId = this.groupId;
        addMemberDto.memberId = new MemberId();
        addMemberDto.memberId.id = result.member;
        addMemberDto.memberId.type = 'user';

        if (this.protectedGroup) {
          this.groupService.addMemberProtected(addMemberDto).subscribe((ret) => {
              this.uxMessageService.handleSuccess('Member added saved');
              // refresh
              window.location.href = window.location.href;
            },
            (err) => this.uxMessageService.handleError(err)
          );
        } else {
          this.groupService.addMember(addMemberDto).subscribe((ret) => {
              this.uxMessageService.handleSuccess('Member added saved');
              // refresh
              window.location.href = window.location.href;
            },
            (err) => this.uxMessageService.handleError(err)
          );
        }
      }
    });
  }

  removeMember($event: UserResource) {
    const removeMemberDto = new RemoveMemberDto();
    removeMemberDto.groupId = this.groupId;
    removeMemberDto.memberId = new MemberId();
    removeMemberDto.memberId.id = $event.username;
    removeMemberDto.memberId.type = 'user';

    if (this.protectedGroup) {
      this.groupService.removeMemberProtected(removeMemberDto).subscribe((ret) => {
          this.uxMessageService.handleSuccess('Member remove from group saved');
          // refresh
          window.location.href = window.location.href;
        },
        (err) => this.uxMessageService.handleError(err)
      );
    } else {
      this.groupService.removeMember(removeMemberDto).subscribe((ret) => {
          this.uxMessageService.handleSuccess('Member remove from group saved');
          // refresh
          window.location.href = window.location.href;

        },
        (err) => this.uxMessageService.handleError(err)
      );
    }
  }

  delete() {
    const deleteGroupDto = new DeleteGroupDto();
    deleteGroupDto.groupId = this.groupId;
    if (!this.protectedGroup) {
      this.groupService.deleteGroup(deleteGroupDto).subscribe((ret) => {
          this.uxMessageService.handleSuccess('Group deleted');
        },
        (err) => this.uxMessageService.handleError(err));
    } else {
      this.groupService.deleteGroupProtected(deleteGroupDto).subscribe((ret) => {
          this.uxMessageService.handleSuccess('Group deleted');
        },
        (err) => this.uxMessageService.handleError(err));
    }
  }

  confirmDelete() {
    const deleteGroupDto = new ConfirmDeleteGroupDto();
    deleteGroupDto.groupId = this.groupId;
    if (!this.protectedGroup) {
      this.groupService.confirmDeleteGroup(deleteGroupDto).subscribe((ret) => {
          this.uxMessageService.handleSuccess('Group permanently deleted');
        },
        (err) => this.uxMessageService.handleError(err));
    } else {
      this.groupService.confirmDeleteGroupProtected(deleteGroupDto).subscribe((ret) => {
          this.uxMessageService.handleSuccess('Group permanently deleted');
        },
        (err) => this.uxMessageService.handleError(err));
    }
  }

}
