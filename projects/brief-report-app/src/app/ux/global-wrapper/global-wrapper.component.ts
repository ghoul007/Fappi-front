import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrganizationService, SuperAdminService, TaskService, UserInfoService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {GlobalWrapperHelper} from 'fappi-ng-utils-components';


@Component({
  templateUrl: 'global-wrapper.component.html',
  styleUrls: ['global-wrapper.component.scss']
})
export class GlobalWrapperComponent extends GlobalWrapperHelper {

  public tasksCount = 0;

  constructor(router: Router, route: ActivatedRoute, superadminService: SuperAdminService,
              userInfoService: UserInfoService, organizationService: OrganizationService,
              uxMessageService: UXMessageService, private taskService: TaskService) {
    super(router, route, superadminService, userInfoService, organizationService, uxMessageService);


    if (this.route.snapshot.params.orgId) {
      this.taskService.findAll(this.route.snapshot.params.orgId).subscribe((tasks) => {
          this.tasksCount = tasks.length;
        },
        (err) => this.uxMessageService.handleError(err)
      );
    }

  }

  onNoOrgSelected(): void {
    this.router.navigate(['org/default/chapters']);
  }

  orgSelected(id: string) {
    this.router.navigate(['org', id, 'chapters']);
  }

  profilSelected() {
    // FIXME introduce my account pages:
    window.open('https://keycloak.preprod.ftprod.fr/auth/realms/fappi_brief-content-pp/account/');
  }

  logout() {
    this.userInfoService.logout().subscribe((r) => {
        // we add the  redirect url:
        window.location.href = r.logoutUrl + window.location.href;
      },
      (e) => {
        // TODO trace
      }
    );
  }

  goHome(){
    this.router.navigate(['org', this.selectedOrg?.id.id, 'chapters']);
  }

}
