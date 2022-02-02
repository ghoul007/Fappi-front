import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {Task, TaskService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-list-tasks-view',
  templateUrl: './list-tasks-view.component.html',
  styleUrls: ['./list-tasks-view.component.scss']
})
export class ListTasksViewComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  orgId: string;

  dataSource = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['name', 'processName', 'action'];

  constructor(private taskService: TaskService, private uxMessageService: UXMessageService, private route: ActivatedRoute,
              private router: Router) {
    this.orgId = this.route.parent.parent.snapshot.params.orgId;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.taskService.findAll(this.orgId).subscribe((tasks) => {
        this.dataSource.data = tasks;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  goToChapter(element) {
    if (element.variables && element.variables.chapterId) {
      // <a [routerLink]="'edit/'+element.id.elementId">
      this.router.navigate(['/org', this.orgId, 'chapters', 'edit', element.variables.chapterId]);
    } else {
      this.uxMessageService.handleError('Le chapitre n\'est pas dispobible.');
    }
  }

}
