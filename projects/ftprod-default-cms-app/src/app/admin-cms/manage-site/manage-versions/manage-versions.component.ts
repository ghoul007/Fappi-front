import {Component, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NodeResource, NodeVersionResource, SiteService} from 'fappi-common-model';
import {ConfirmDialog, UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CmsAddSiteVersionComponent} from 'fappi-ng-cms';

@Component({
  templateUrl: './manage-versions.component.html',
  styleUrls: ['./manage-versions.component.scss']
})
export class ManageVersionsComponent {

  // the site id
  slug: string;
  name: string;
  orgId: string;

  selectedNode: NodeResource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<NodeVersionResource>([]);
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private fb: FormBuilder, private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService, public dialog: MatDialog) {
    this.initData();
  }

  initData() {
    this.route.parent.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.orgId = this.route.parent.parent.parent.snapshot.params.orgId;
      this.siteService.findVersions(this.orgId, this.slug).subscribe((versions) => {
          this.dataSource.data = versions;
        },
        (err) => this.uxMessageService.handleError(err)
      );

    });
  }


  openCreateVersion() {
    const dialogRef = this.dialog.open(CmsAddSiteVersionComponent, {
      width: '450px', data: {orgId: this.orgId, siteId: this.slug}
    });

    dialogRef.afterClosed().subscribe(result => {
        this.uxMessageService.handleSuccess('Version creation launched');
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  delete(version: NodeVersionResource) {
    const dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteConfirm(version);
      }
    });
  }


  private deleteConfirm(version: NodeVersionResource) {
    /*
    // IMPLEMENTS DELETE VERSION
    const deleteDto = new DeletevChannelDto();
     deleteDto.id = new ChannelIdDto();
     deleteDto.id.orgId = this.orgId;
     deleteDto.id.siteId = this.slug;
     deleteDto.id.channelSlug = channelResource.id;
     this.siteService.deleteChannel(deleteDto).subscribe((sites) => {
         this.uxMessageService.handleSuccess('Deleted');
         window.location.href = window.location.href;
       },
       (err) => this.uxMessageService.handleError(err)
     );*/
  }

}
