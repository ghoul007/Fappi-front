import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteService} from 'fappi-common-model';

@Component({
  selector: 'app-edit-node-type-view',
  templateUrl: './edit-node-type-view.component.html',
  styleUrls: ['./edit-node-type-view.component.scss'],
})
export class EditNodeTypeViewComponent {

  orgId: string;
  siteId: string;
  attachedElementId: string;
  nodeTypeSlug: string;


  constructor(public siteService: SiteService, private router: Router, private route: ActivatedRoute) {

    this.route.paramMap.subscribe(params => {

      this.orgId = this.route.parent.parent.snapshot.params.orgId;
      this.siteId = params.get('slug');
      this.attachedElementId = params.get('attachedElementId');
      this.nodeTypeSlug = params.get('nodeTypeSlug');
    });
  }

  onSaved() {
    this.router.navigate(['org', this.orgId, 'chapters', 'edit', this.siteId]);
  }


  back() {
    window.history.back();
  }

}

