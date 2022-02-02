import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrganizationService, SubscriptionStatus, SuperAdminService, UserInfoService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {GlobalWrapperHelper} from 'fappi-ng-utils-components';
import {ShepherdService} from "angular-shepherd";
import {tourAdminSteps} from "./tour-steps";

@Component({
  templateUrl: 'global-wrapper.component.html',
  styleUrls: ['global-wrapper.component.scss'],
})
export class GlobalWrapperComponent extends GlobalWrapperHelper {

  leftMobileMenuOpen: boolean;
  hideRuleContent: boolean[] = [];
  // public buttonName: any = 'Expand';
  i: any;
  isSuperadmin: boolean;

  constructor(router: Router, route: ActivatedRoute, superadminService: SuperAdminService,
              userInfoService: UserInfoService, organizationService: OrganizationService,
              uxMessageService: UXMessageService, private shepherdService: ShepherdService) {
    super(router, route, superadminService, userInfoService, organizationService, uxMessageService);

    this.superadminService.findCurrent().subscribe((c) => {
      this.isSuperadmin = c.name === 'fappi-admin';
    });

    this.buildTour();
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

  toggle(i) {
    // toggle based on index
    this.hideRuleContent[i] = !this.hideRuleContent[i];
  }

  buildTour() {
    if (!localStorage.getItem('fappi_main_tour') && ! this.isSuperadmin) {
      this.userInfoService.hasAnyRole(['ADMIN']).subscribe((has) => {
        if (has) {
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
          localStorage.setItem('fappi_main_tour', 'done');
        }
      });
    }
  }

}
