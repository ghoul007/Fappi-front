import {Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MediaService} from 'fappi-common-model';
import {ActivatedRoute, Router} from '@angular/router';
import {UXMessageService} from 'fappi-ng-material-kit';
import {UploadMediaComponent} from 'fappi-ng-media';
import {MediaDatasource} from './MediaDatasource';

@Component({
  templateUrl: 'view-media.component.html',
  styleUrls: ['view-media.component.scss']
})
export class ViewMediaComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  orgId: string;

  accept: true;

  medias: MediaDatasource;

  constructor(private mediaService: MediaService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService,
              public dialog: MatDialog
  ) {
    this.orgId = this.route.parent.parent.snapshot.params.orgId;
    this.refreshList();
  }

  addFile() {
    const dialogRef = this.dialog.open(UploadMediaComponent, {
      width: '450px', data: {orgId: this.orgId}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.uploadDone) {
        setTimeout(() => this.refreshList(), 2000);
      }
    });
  }


  refreshList() {
    this.mediaService.list(this.orgId, '/', 0, 1000).subscribe((medias) => {
        this.medias = new MediaDatasource(medias);
        this.medias.paginator = this.paginator;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

}

