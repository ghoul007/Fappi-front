import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClientResource, Organization, OrganizationService, SuperAdminService, UserInfoService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'fappi-select-org-light',
  templateUrl: 'select-org-light-component.component.html',
  styleUrls: ['select-org-light-component.component.scss']
})
export class SelectOrganizationLightComponent {

  title = 'board';
  organizations: Organization[];
  orgId: string;

  client: ClientResource;
  superadminActived: boolean;
  username: string;
  @Input()
  selectedOrg: Organization;
  @Output()
  onOrganizationSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  onNoOrgSelected: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  onProfilSelected: EventEmitter<void> = new EventEmitter<void>();
  @Input()
  showAppSelector = true;
  @Input()
  shortAppName: string;


  constructor(private organizationService: OrganizationService, private userInfoService: UserInfoService,
              private superadminService: SuperAdminService, private uxMessageService: UXMessageService) {
    this.initUx();
  }

  initUx() {
    this.userInfoService.hasRole(['ROLE_ADMIN']).subscribe((has) => {
      if (has) {
        this.organizationService.findAllAsAdmin(false).subscribe(orgs => {
          this.organizations = orgs.sort((a, b) => a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase() ? -1 : 1);
        });
      } else {
        this.organizationService.findAll().subscribe(orgs => {
          this.organizations = orgs.sort((a, b) => a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase() ? -1 : 1);
        });
      }
    });
    this.superadminService.findCurrent().subscribe((c) => {
      this.client = c;
      if (c.name === 'fappi-admin') {
        this.superadminActived = true;
        this.onNoOrgSelected.emit();
      }
    });

    this.userInfoService.infos().subscribe((userInfo) => {
      this.username = userInfo.name;
    });

  }
  profilSelected() {
    this.onProfilSelected.emit();
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

  orgSelected(orgId: string) {
    this.onOrganizationSelected.emit(orgId);
  }

  onOrganizationChange($event) {
    this.orgId = $event.option.value.id.id;
    this.orgSelected(this.orgId);
  }

  displayFn(organization?: Organization): string | undefined {
    return organization ? organization.name : undefined;
  }

}


