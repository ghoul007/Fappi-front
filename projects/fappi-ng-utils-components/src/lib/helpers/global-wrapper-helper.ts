import {ActivatedRoute, Router} from '@angular/router';
import {ClientResource, Organization, OrganizationService, SuperAdminService, UserInfoService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';


/**
 * // FIXME make it more generic. Dont use router and use EventEmitter.
 * A class that can be used to build a standard FAPPI app with a main wrapper like:
 <fappi-select-org-component (onOrganizationSelected)="onOrganizationSelected($event)"
 (onNoOrgSelected)="onNoOrgSelected()"
 (onProfilSelected)="onProfilSelected()"
 [selectedOrg]="selectedOrg">
 <div mainMenu>
 <app-main-menu [selectedOrg]="selectedOrg"></app-main-menu>
 </div>
 </fappi-select-org-component>
 <router-outlet></router-outlet>
 *
 */
export class GlobalWrapperHelper {

  client: ClientResource;
  superadminActived: boolean;
  username: string;
  orgId: string;
  selectedOrg: Organization;
  organizations: Organization[];
  poweredBy: string;

  constructor(protected router: Router, protected route: ActivatedRoute, protected superadminService: SuperAdminService,
              protected userInfoService: UserInfoService, protected organizationService: OrganizationService,
              protected uxMessageService: UXMessageService) {
    this.initUx();
    this.initForm();
  }


  initUx() {
    this.superadminService.findCurrent().subscribe((c) => {
      this.client = c;
      if (c.name === 'fappi-admin') {
        this.superadminActived = true;
        this.router.navigate(['superadmin']);
      }
      this.poweredBy = c.personalization.poweredByText;
    });

    this.userInfoService.infos().subscribe((userInfo) => {
      this.username = userInfo.name;
    });
  }

  initForm() {
    this.organizationService.findAll().subscribe(orgs => {
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
  }

  onProfilSelected() {
    this.router.navigate(['/org/' + this.orgId + '/profil']);
  }

  onOrganizationSelected(id: string) {
    this.organizationService.findOne(id).subscribe((org) => {
      this.selectedOrg = org;
      const parts =  this.router.url.split('/');
      if (parts.length > 1 ) {
        parts[2] = this.selectedOrg.id.id;
      }
      this.router.navigate(parts.slice(1, parts.length));
    });

  }

  onNoOrgSelected() {

  }

}

class GlobalWrapperHelperImpl extends GlobalWrapperHelper {
}
