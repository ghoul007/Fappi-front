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
  hideRuleContent: boolean[] = [];
  // public buttonName: any = 'Expand';
  i: any;

  constructor(router: Router, route: ActivatedRoute, superadminService: SuperAdminService,
              userInfoService: UserInfoService, organizationService: OrganizationService,
              uxMessageService: UXMessageService) {
    super(router, route, superadminService, userInfoService, organizationService, uxMessageService);
  }

  /**
   * Redirect to the main "my profil"
   */
  onProfilSelected() {
    window.location.href = '/smart-brain-admin/org/' + this.orgId + '/profil';
  }


  initForm() {
    // if the user is superadmin, we retrieve all orgs
    const isSuperadmin = this.userInfoService.hasRole(['ROLE_ADMIN']).subscribe((has) => {
      if (has) {
        this.organizationService.findAllAsAdmin(false).subscribe(orgs => {
            this.organizations = orgs.sort((a, b) => a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase() ? -1 : 1);
            // check against url:
            this.route.paramMap.subscribe(params => {
              this.orgId = params.get('orgId');
              for (const org of this.organizations) {
                if (org.id.id === this.orgId) {
                  this.selectedOrg = org;
                }
              }
            });
            // select default if not selected
            setTimeout(() => {
              if (!this.selectedOrg && this.organizations.length > 0 && !this.superadminActived) {
                this.router.navigate(['org/' + this.organizations[0].id.id]);
              }
            }, 500);
          },
          (err) => this.uxMessageService.handleError(err)
        );
      } else {
        super.initForm();
      }
    });
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

  changeOrg(id: string) {
    super.onOrganizationSelected(id);

  }

  toggle(i) {
    // toggle based on index
    this.hideRuleContent[i] = !this.hideRuleContent[i];
  }
}
