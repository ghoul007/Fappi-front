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
  slug: string;
  name: string;
  orgId: string;

  menuOpenned = true;

  selectedNode: NodeResource;
  toolbarModel = {selectedChannel: ChannelResource, selectedVersion: NodeVersionResource};

  channels: ChannelResource[] = [];
  versions: NodeVersionResource[] = [];

  constructor(private fb: FormBuilder, private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService, private dialog: MatDialog) {
    this.initForm();
    this.initData();

  }

  initData() {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.orgId = this.route.parent.parent.snapshot.params.orgId;
      this.siteService.findOne(this.orgId, this.slug).subscribe(site => {
          this.slug = site.id.elementId;
          this.name = site.name;
          this.siteForm.patchValue(site);
        },
        (err) => this.uxMessageService.handleError(err)
      );

      this.siteService.findChannels(this.orgId, this.slug).subscribe((channels) => {
          this.channels = channels;
        },
        (err) => this.uxMessageService.handleError(err)
      );

      this.siteService.findVersions(this.orgId, this.slug).subscribe((versions) => {
          this.versions = versions;
        },
        (err) => this.uxMessageService.handleError(err)
      );
    });
  }

  initForm() {
    this.siteForm = this.fb.group({});
  }

  onSubmitForm() {
    const formValue = this.siteForm.value;
    const site = new UpdateSiteDto();
    site.id.organizationId = this.orgId;
    site.id.elementId = this.slug;
    this.siteService.updateSite(site).subscribe((ret) => {
        this.router.navigate(['/sites']);
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
