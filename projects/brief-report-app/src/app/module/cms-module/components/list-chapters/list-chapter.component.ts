import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {DeleteSiteDto, SiteResource, SiteService, UserInfoService} from 'fappi-common-model';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialog, UXMessageService} from 'fappi-ng-material-kit';
import {CmsEditRightsComponent} from 'fappi-ng-cms';


@Component({
  templateUrl: 'list-chapter.component.html',
  styleUrls: ['list-chapter.component.scss']
})
export class ListChapterComponent {

  private static NO_RIGHT_COLUMNS = ['name', 'lastModified'];
  private static WITH_RIGHT_COLUMNS = ['name', 'lastModified', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  orgId: string;
  dataSource = new MatTableDataSource<SiteResource>([]);
  displayedColumns: string[] = ListChapterComponent.NO_RIGHT_COLUMNS;

  constructor(private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private userService: UserInfoService,
              private uxMessageService: UXMessageService, private elementRef: ElementRef, public dialog: MatDialog) {

    this.route.parent.parent.params.subscribe((p) => {
      this.orgId = p.orgId;
      this.siteService.findAll(this.orgId).subscribe((sites) => {
          this.dataSource.data = sites;
        },
        (err) => this.uxMessageService.handleError(err)
      );
      this.userService.hasGroup(this.orgId, ['admin']).subscribe((has) => {
        if (has) {
          this.displayedColumns = ListChapterComponent.WITH_RIGHT_COLUMNS;
        } else {
          this.displayedColumns = ListChapterComponent.NO_RIGHT_COLUMNS;
        }
      });
    });
  }

  adminChapter(site: SiteResource) {
    this.router.navigate(['admin', site.id.elementId, 'content-types'], {relativeTo: this.route });
  }
}

