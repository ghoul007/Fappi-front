import {Component, Input} from '@angular/core';
import {SubscriptionStatus, SuperAdminService, UserInfoService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'fappi-app-selector',
  templateUrl: 'app-selector.component.html',
  styleUrls: ['app-selector.component.scss']
})
export class AppSelectorComponent {

  apps: any[] = [];
  @Input()
  orgId: string;

  @Input()
  inline = false;

  constructor(private userInfoService: UserInfoService, private superadminService: SuperAdminService,
              private uxMessageService: UXMessageService) {

    this.superadminService.findCurrent().subscribe((c) => {
      for (const sub of c.subscriptions) {
        if (sub.status === SubscriptionStatus.ACTIVATED) {
          if (sub.id.subscriptionId === 'CRM') {
            this.apps.push({
              label: 'CRM',
              icon: 'people',
              id: 'crm'
            });
          } else if (sub.id.subscriptionId === 'CMS') {
            if (!window.location.pathname.startsWith('/content/')) {
              this.apps.push({
                label: 'Content',
                icon: 'create',
                id: 'content'
              });
            }
          } else if (sub.id.subscriptionId === 'FHIR') {
            if (!window.location.pathname.startsWith('/fhir-app/')) {
              this.apps.push({
                label: 'Fhir',
                icon: 'local_hospital',
                id: 'fhir-app'
              });
            }
          }
        }
      }
    });


    if (!window.location.pathname.startsWith('/media-app/')) {
      this.apps.push({
        label: 'Medias',
        icon: 'insert_drive_file',
        id: 'media'
      });
    }
    if (!window.location.pathname.startsWith('/front/')) {
      this.apps.push({
        label: 'Admin',
        icon: 'build',
        id: 'admin'
      });
    }
  }


  goToApp(app) {
    if (app.id === 'media') {
      if (this.orgId && this.orgId !== '') {
        window.location.assign(`/media-app/org/${this.orgId}/`);
      } else {
        window.location.assign(`/media-app/`);
      }
    } else if (app.id === 'crm') {
      if (this.orgId && this.orgId !== '') {
        window.location.assign(`/crm-app/org/${this.orgId}/`);
      } else {
        window.location.assign(`/crm-app/`);
      }
    } else if (app.id === 'content') {
      if (this.orgId && this.orgId !== '') {
        window.location.assign(`/content/org/${this.orgId}/`);
      } else {
        window.location.assign(`/content/`);
      }
    } else if (app.id === 'admin') {
      if (this.orgId && this.orgId !== '') {
        window.location.assign(`/front/org/${this.orgId}/`);
      } else {
        window.location.assign(`/front/`);
      }
    } else if (app.id === 'fhir-app') {
      if (this.orgId && this.orgId !== '') {
        window.location.assign(`/fhir-app/org/${this.orgId}/`);
      } else {
        window.location.assign(`/fhir-app/`);
      }
    }

  }
}
