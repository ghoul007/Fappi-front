import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {tap} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AuditService} from 'fappi-common-model';
import {AuditContextResourceDatasource} from '../../datasource/AuditContextResourceDatasource';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-audit-view',
  templateUrl: './list-audit-view.component.html',
  styleUrls: ['./list-audit-view.component.scss']
})
export class ListAuditViewComponent implements AfterViewInit, OnInit {

  orgId: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  filters: any = {
    username: '',
    ip: '',
    service: '',
    action: '',
    elementType: ''
  };


  dataSource: AuditContextResourceDatasource;
  largeCols: string[] = ['username', 'ip', 'service', 'action', 'actionDescription', 'actionDate', 'elementType', 'elementRef'];
  smallCols: string[] = ['allInOneCol'];
  displayedColumns: string[] = ['username', 'ip', 'service', 'action', 'actionDescription', 'actionDate', 'elementType', 'elementRef'];

  constructor(private router: Router, private route: ActivatedRoute, private auditService: AuditService,
              private uxMessageService: UXMessageService, breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe(result => {
      if (result.matches) {
        this.displayedColumns = this.largeCols;
      } else {
        this.displayedColumns = this.smallCols;
      }
    });
  }

  ngOnInit() {
    this.orgId = this.route.parent.parent.snapshot.params.orgId;
    this.dataSource = new AuditContextResourceDatasource(this.auditService, this.orgId);
  }

  ngAfterViewInit() {
    this.dataSource.loadAudit(this.filters,
      'asc',
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 20);

    this.paginator.page
      .pipe(
        tap(() => this.loadAuditPage())
      )
      .subscribe();
  }

  loadAuditPage() {
    this.dataSource.loadAudit(
      this.filters,
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  applyFilter() {
    this.loadAuditPage();
  }

}
