import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ChannelResource, CustomTypeResource, NodeResource, NodeVersionResource, SiteService, UpdateSiteDto} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {SiteVersion} from 'fappi-common-model';
import {MatDialog} from '@angular/material/dialog';
import {CmsAddSiteVersionComponent} from 'fappi-ng-cms';

@Component({
  templateUrl: './show-site-view.component.html',
  styleUrls: ['./show-site-view.component.scss']
})
export class ShowSiteViewComponent {

  siteForm: FormGroup;

  // the site id
  slug = 'default';
  name = 'Profils';
  orgId = 'default';

  treeSelectorOpenned = true;
  selectedNode: NodeResource;
  toolbarModel = {selectedChannel: ChannelResource, selectedVersion: NodeVersionResource};

  channels: ChannelResource[] = [];

  constructor(private fb: FormBuilder, private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService, private dialog: MatDialog) {
    this.initData();
  }

  initData() {
      this.siteService.findChannels(this.orgId, this.slug).subscribe((channels) => {
          this.channels = channels;
        },
        (err) => this.uxMessageService.handleError(err)
      );
  }

  onNodeSelected(node: NodeResource) {
    this.selectedNode = node;
  }

  onNodeTypeSelected(nodeTypeResource: CustomTypeResource) {
    this.router.navigate(['org', this.orgId, 'cms', 'sites', 'edit', this.slug,
      'node-type', 'edit', nodeTypeResource.id.id.elementId, nodeTypeResource.id.slug]);
  }

  back() {
    window.history.back();
  }

}
