import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {OrganizationService, SuperAdminService, UserInfoService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {GlobalWrapperHelper} from 'fappi-ng-utils-components';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  templateUrl: 'sub-wrapper.component.html',
  styleUrls: ['sub-wrapper.component.scss'],
  animations: [
    trigger('gradientState', [
      state('tasks', style({
        backgroundPosition: '0%'
      })),
      state('chapters', style({
        backgroundPosition: '100%'
      })),
      state('other', style({
        display: 'none'
      })),
      transition('tasks <=> chapters', animate('1000ms ease'))
    ]),
  ],
})
export class SubWrapperComponent extends GlobalWrapperHelper {


  gradientState = 'chapters';

  constructor(router: Router, route: ActivatedRoute, superadminService: SuperAdminService,
              userInfoService: UserInfoService, organizationService: OrganizationService,
              uxMessageService: UXMessageService) {
    super(router, route, superadminService, userInfoService, organizationService, uxMessageService);


    router.events.subscribe(
      (e) => {
        if (e instanceof NavigationEnd) {

          if (e.url.endsWith('/chapters') || e.url === '/') {
            this.gradientState = 'chapters';
          } else if (e.url.endsWith('/contributions')) {
            this.gradientState = 'tasks';
          } else {
            this.gradientState = 'other';

          }
        }
      }
    );

    this.route.paramMap.subscribe(params => {
      this.orgId = params.get('orgId');

    });
  }

  onNoOrgSelected(): void {
    this.router.navigate(['org/default/']);
  }


  orgSelected(id: string) {

  }

  profilSelected() {

  }

  logout() {

  }

}
