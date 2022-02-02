import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {DeleteSiteDto, SiteResource, SiteService} from 'fappi-common-model';
import {ConfirmDialog, UXMessageService} from 'fappi-ng-material-kit';
import {CmsEditRightsComponent, CmsExportSiteComponent, CmsImportSiteComponent} from 'fappi-ng-cms';

@Component({
  selector: 'app-list-sites-view',
  templateUrl: './list-sites-view.component.html',
  styleUrls: ['./list-sites-view.component.scss']
})
export class ListSitesViewComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  orgId: string;

  dataSource = new MatTableDataSource<SiteResource>([]);
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService, public dialog: MatDialog) {
    this.orgId = this.route.parent.parent.snapshot.params.orgId;
    this.siteService.findAll(this.orgId).subscribe((sites) => {
        this.dataSource.data = sites;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  /*
  delete(site: SiteResource) {
    const dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteConfirm(site);
      }
    });
  }

  editRight(site: SiteResource) {
    const dialogRef = this.dialog.open(CmsEditRightsComponent,
      {data: {orgId: site.id.organizationId, siteId: site.id.elementId}, width: '550px'});
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  editContentTypes(site: SiteResource) {
    this.router.navigate(['org', this.orgId, 'cms', 'sites', 'admin', site.id.elementId, 'content-types']);
  }
*/

  adminChapter(site: SiteResource) {
    this.router.navigate(['org', this.orgId, 'cms', 'sites', 'admin', site.id.elementId, 'content-types']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  export() {
    const dialogRef = this.dialog.open(CmsExportSiteComponent,
      {data: {orgId: this.orgId}, width: '550px'});
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  import() {
    const dialogRef = this.dialog.open(CmsImportSiteComponent,
      {data: {orgId: this.orgId}, width: '550px'});
    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
