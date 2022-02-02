import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrganizationService, SuperAdminService, UserInfoService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {GlobalWrapperHelper} from 'fappi-ng-utils-components';



@Component({
  templateUrl: 'global-wrapper.component.html',
  styleUrls: ['global-wrapper.component.scss'],
})
export class GlobalWrapperComponent extends GlobalWrapperHelper {

  leftMobileMenuOpen: boolean;
  public orgId: string;
  public userInfoService;

  constructor(router: Router, route: ActivatedRoute, superadminService: SuperAdminService,
              userInfoService: UserInfoService, organizationService: OrganizationService,
              uxMessageService: UXMessageService) {
    super(router, route, superadminService, userInfoService, organizationService, uxMessageService);
  }

  /**
   * Redirect to the main "my profil"
   */
  onProfilSelected() {
    window.open('/front/org/' + this.orgId + '/profil');
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
}


