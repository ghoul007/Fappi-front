import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {ProcessDefinitionResource, ProcessService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-list-process-view',
  templateUrl: './list-process-view.component.html',
  styleUrls: ['./list-process-view.component.scss']
})
export class ListProcessViewComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  orgId: string;

  dataSource = new MatTableDataSource<ProcessDefinitionResource>([]);
  displayedColumns: string[] = ['id', 'key', 'version', 'description'];

  constructor(private processService: ProcessService, private route: ActivatedRoute, private uxMessageService: UXMessageService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.orgId = this.route.parent.parent.snapshot.params.orgId;
    this.processService.findAll(this.orgId).subscribe((process) => {
        this.dataSource.data = process.content;
      },
      (err) => this.uxMessageService.handleError(err)
    );

  }

}
