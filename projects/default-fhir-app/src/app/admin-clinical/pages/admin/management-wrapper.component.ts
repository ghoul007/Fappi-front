import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SiteService} from 'fappi-common-model';
import {ActivatedRoute, Router} from '@angular/router';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  templateUrl: './management-wrapper.component.html',
  styleUrls: ['./management-wrapper.component.scss']
})
export class ManagementWrapperComponent {

  // the site id
  slug: string;
  orgId: string;

  constructor(private fb: FormBuilder, private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService) {
    this.initData();
  }

  initData() {
    this.route.paramMap.subscribe(params => {
      this.orgId = this.route.parent.parent.snapshot.params.orgId;
    });
  }

}
