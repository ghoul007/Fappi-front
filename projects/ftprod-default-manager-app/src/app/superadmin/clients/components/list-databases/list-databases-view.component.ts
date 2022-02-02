import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Data, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ClientResource, SuperAdminService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {DatabaseResource} from 'fappi-common-model';

@Component({
  selector: 'app-databases-view',
  templateUrl: './list-databases-view.component.html',
  styleUrls: ['./list-databases-view.component.scss']
})
export class ListDatabasesViewComponent implements AfterViewInit{


  @ViewChild(MatPaginator) paginator: MatPaginator;


  dataSource = new MatTableDataSource<DatabaseResource>([]);
  displayedColumns: string[] = ['id', 'name', 'description', 'databaseHost', 'databaseDriver', 'actions'];

  constructor(private router: Router, private superAdminService: SuperAdminService, private uxMessageService: UXMessageService) {
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.superAdminService.findAllDatabases().subscribe((dbs) => {
        this.dataSource.data = dbs.content;
      },
      (err) => this.uxMessageService.handleError(err)
    );

  }


  onClientSelected(event: DatabaseResource) {
    this.router.navigate(['superadmin', 'clients', 'databases', 'edit', event.databaseId]);
  }


  show(elem: ClientResource) {
    window.open(elem.domain, '_blank');
  }
}
