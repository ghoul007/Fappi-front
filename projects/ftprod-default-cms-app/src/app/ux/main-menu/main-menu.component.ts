import {Component, Input} from '@angular/core';
import {Organization, SubscriptionStatus, SuperAdminService} from 'fappi-common-model';


@Component({
  selector: 'app-main-menu',
  templateUrl: 'main-menu.component.html',
  styleUrls: ['main-menu.component.scss']
})
export class MainMenuComponent {

  @Input()
  selectedOrg: Organization;

  crmActivated: boolean;
  cmsActivated: boolean;


  constructor(private superadminService: SuperAdminService) {
    this.initUx();
  }

  initUx() {
    this.superadminService.findCurrent().subscribe((c) => {
      for (const sub of c.subscriptions) {
        if (sub.status === SubscriptionStatus.ACTIVATED) {
          if (sub.id.subscriptionId === 'CRM') {
            this.crmActivated = true;
          } else if (sub.id.subscriptionId === 'CMS') {
            this.cmsActivated = true;
          }
        }
      }
    });
  }

}
