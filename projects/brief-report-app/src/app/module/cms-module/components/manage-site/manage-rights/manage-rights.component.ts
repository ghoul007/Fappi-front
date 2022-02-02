import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomTypeResource, NodeResource, SiteService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  templateUrl: './manage-rights.component.html',
  styleUrls: ['./manage-rights.component.scss']
})
export class ManageRightsComponent {

  // the site id
  slug: string;
  name: string;
  orgId: string;

  selectedNode: NodeResource;

  constructor(private fb: FormBuilder, private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService) {
    this.initData();
  }

  initData() {
    this.route.parent.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.orgId = this.route.parent.parent.parent.snapshot.params.orgId;
    });
  }

  back() {
    window.history.back();
  }

}
