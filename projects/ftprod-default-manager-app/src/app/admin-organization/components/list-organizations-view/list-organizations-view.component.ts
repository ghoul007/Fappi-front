import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Organization, OrganizationService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-list-organizations-view',
  templateUrl: './list-organizations-view.component.html',
  styleUrls: ['./list-organizations-view.component.scss']
})
export class ListOrganizationsViewComponent implements AfterViewInit {

  data = {showDeleted: false};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Organization>([]);
  largeCols: string[] = ['name', 'description', 'status', 'validationState'];
  smallCols: string[] = ['name'];
  displayedColumns: string[] = this.largeCols;

  constructor(private observationService: OrganizationService, private uxMessageService: UXMessageService,
              breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe(result => {
      if (result.matches) {
        this.displayedColumns = this.largeCols;
      } else {
        this.displayedColumns = this.smallCols;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.load();
  }

  load() {
    this.observationService.findAllAsAdmin(this.data.showDeleted).subscribe((org) => {
        this.dataSource.data = org;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

}
