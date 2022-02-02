import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CmsTreeComponent} from '../cms-tree.component';
import {CustomTypeResource, CustomTypeVisibility, SiteService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';


@Component({
  templateUrl: './create-node.component.html',
  styleUrls: ['./create-node.component.scss'],
  providers: []
})
export class CreateNodeComponent {

  nodeTypes: CustomTypeResource[];

  hideId = false;

  constructor(
    public dialogRef: MatDialogRef<CmsTreeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    siteService: SiteService,
    private uxMessageService: UXMessageService
  ) {
    this.hideId = data.hideId === true;
    siteService.findAllNodeTypes(data.orgId, data.siteId).subscribe((nodeTypes) => {
        this.nodeTypes = nodeTypes.filter((n) => n.visibility === CustomTypeVisibility.PUBLIC);
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
