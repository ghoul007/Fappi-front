import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {DeleteSiteDto, Organization, OrganizationService, SiteResource, SiteService} from 'fappi-common-model';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialog, UXMessageService} from 'fappi-ng-material-kit';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  templateUrl: 'list-clients.component.html',
  styleUrls: ['list-clients.component.scss']
})
export class ListClientsComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  dataSource = new MatTableDataSource<Organization>([]);
  largeCols: string[] = ['name', 'description'];
  smallCols: string[] = ['name'];
  displayedColumns: string[] = this.largeCols;

  constructor(private organizationService: OrganizationService, private uxMessageService: UXMessageService,
              breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe(result => {
      if (result.matches) {
        this.displayedColumns = this.largeCols;
      } else {
        this.displayedColumns = this.smallCols;
      }
    });
  }

  /*
  deleteClient(id: string) {
    this.organizationService.deleteOrganization(id).subscribe((org) => {
        this.dataSource.data = org;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }*/

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.organizationService.findAllAsAdmin(false).subscribe((org) => {
        this.dataSource.data = org;
        this.sortData({
          active: 'name',
          direction: 'asc'
        });
      },
      (err) => this.uxMessageService.handleError(err)
    );

  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name.toLocaleLowerCase(), b.name.toLocaleLowerCase(), isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


}

