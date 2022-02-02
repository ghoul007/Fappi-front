import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {OrganizationService, UserInfoService, UserResource} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {ShepherdService} from 'angular-shepherd';
import {tourAdminSteps} from './tour-steps';

@Component({
  selector: 'app-list-users-view',
  templateUrl: './list-users-view.component.html',
  styleUrls: ['./list-users-view.component.scss']
})
export class ListUsersViewComponent {

  orgId: string;
  canEdit = false;


  @Input()
  tipsActivated = true;

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,
              public organizationService: OrganizationService, public userInfoService: UserInfoService,
              private uxMessageService: UXMessageService, private shepherdService: ShepherdService) {

    this.route.parent.parent.params.subscribe(params => {
      this.orgId = params.orgId;
    });

    this.userInfoService
      .hasGroup( this.orgId, ['admin'])
      .subscribe(authorized => {
        this.canEdit = authorized;
      });

    if (window.location.pathname.indexOf('/front/') !== 0) {
      this.tipsActivated = false;
    }
  }


  onUserSelected(event: UserResource) {
    if (this.canEdit) {
      this.router.navigate(['org', this.orgId, 'admin', 'users', 'edit', event.id]);
    }
  }


  removeMember($event) {
    this.organizationService.removeMember(this.orgId, $event.username).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Member removed');
        setTimeout(() => window.location.href = window.location.href, 500);
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  startTour() {
    this.shepherdService.defaultStepOptions = {
      classes: '',
      scrollTo: false,
      cancelIcon: {
        enabled: true
      }
    };
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(tourAdminSteps);
    this.shepherdService.start();
  }

}
