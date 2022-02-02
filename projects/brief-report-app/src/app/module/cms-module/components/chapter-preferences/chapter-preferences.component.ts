import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomTypeResource, NodeResource, SiteService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  templateUrl: './chapter-preferences.component.html',
  styleUrls: ['./chapter-preferences.component.scss']
})
export class ChapterPreferencesComponent {

  siteForm: FormGroup;

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
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.orgId = this.route.parent.parent.snapshot.params.orgId;
    });
  }

  onNodeTypeSelected(nodeTypeResource: CustomTypeResource) {
    this.router.navigate(['org', this.orgId, 'chapters', 'admin', this.slug,
      'node-type', 'edit', nodeTypeResource.id.id.elementId, nodeTypeResource.id.slug]);
  }

  back() {
    window.history.back();
  }

}
