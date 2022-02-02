import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomTypeResource, DeleteSiteDto, NodeResource, SiteResource, SiteService} from 'fappi-common-model';
import {ConfirmDialog, UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ChannelResource} from 'fappi-common-model';
import {DeleteChannelDto} from 'fappi-common-model';
import {debug} from 'ng-packagr/lib/utils/log';
import {ChannelIdDto} from 'fappi-common-model';

@Component({
  templateUrl: './manage-channels.component.html',
  styleUrls: ['./manage-channels.component.scss']
})
export class ManageChannelsComponent {

  // the site id
  slug: string;
  name: string;
  orgId: string;

  selectedNode: NodeResource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<ChannelResource>([]);
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private fb: FormBuilder, private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService, public dialog: MatDialog) {
    this.initData();
  }

  initData() {
    this.route.parent.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.orgId = this.route.parent.parent.parent.snapshot.params.orgId;
      this.siteService.findChannels(this.orgId, this.slug).subscribe((channels) => {
          this.dataSource.data = channels;
        },
        (err) => this.uxMessageService.handleError(err)
      );

    });
  }

  back() {
    window.history.back();
  }

  delete(site: ChannelResource) {
    const dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteConfirm(site);
      }
    });
  }


  private deleteConfirm(channelResource: ChannelResource) {
    const deleteDto = new DeleteChannelDto();
    deleteDto.id = new ChannelIdDto();
    deleteDto.id.orgId = this.orgId;
    deleteDto.id.siteId = this.slug;
    deleteDto.id.channelSlug = channelResource.id;
    this.siteService.deleteChannel(deleteDto).subscribe((sites) => {
        this.uxMessageService.handleSuccess('Deleted');
        window.location.href = window.location.href;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

}
