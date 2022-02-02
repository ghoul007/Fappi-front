import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NodeResource, SiteService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';


export class CmsNodeSelectorData {
  title: string;
  selectedOrganizationId: string;
  selectedSiteId: string;
  selectedNode: NodeResource;
  onlyFolder = false;
}

@Component({
  selector: 'app-cms-node-selector',
  templateUrl: './cms-node-selector.component.html',
  styleUrls: ['./cms-node-selector.component.scss'],
  providers: []
})
export class CmsNodeSelectorComponent {


  selectedOrganizationId: string;

  selectedSiteId: string;

  node: NodeResource;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: CmsNodeSelectorData,
    private siteService: SiteService,
    private uxMessageService: UXMessageService
  ) {
    this.selectedOrganizationId = data.selectedOrganizationId;
    this.selectedSiteId = data.selectedSiteId;
  }

  onNodeSelected(node: NodeResource) {
    this.node = node;
  }

  cancel() {
    this.dialogRef.close();
  }

  select() {
    this.data.selectedNode = this.node;
    this.dialogRef.close(this.data);
  }
}

