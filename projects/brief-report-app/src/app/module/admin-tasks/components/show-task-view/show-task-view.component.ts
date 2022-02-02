import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialog, UXMessageService} from 'fappi-ng-material-kit';
import {Task, TaskService} from 'fappi-common-model';


/**
 * @Deprecated plus de détail des tâches.
 */
@Component({
  selector: 'app-show-task-view',
  templateUrl: './show-task-view.component.html',
  styleUrls: ['./show-task-view.component.scss']
})
export class ShowTaskViewComponent {

  id: string;
  taskName: string;
  formData: any = {};
  orgId: string;
  formKey: string;
  task: Task;
  propertyKeys: any[];

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService, public dialog: MatDialog) {
    this.initForm();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.orgId = this.route.parent.parent.snapshot.params.orgId;
      this.taskService.findOne(this.orgId, this.id).subscribe(task => {
          this.task = task;
          this.taskName = task.name;
          this.formKey = task.formKey;

          this.propertyKeys = [];

          for (const key of Object.keys(this.task.variables)) {
            this.propertyKeys.push(key);
          }


        },
        (err) => this.uxMessageService.handleError(err)
      );
    });
  }

  initForm() {

  }

  onSubmitForm() {
    this.taskService.complete(this.orgId, this.id, this.formData).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Task completed');
        this.router.navigate(['org', this.orgId, 'tasks']);
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  onDeleteForm() {
    const dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.delete(this.orgId, this.id).subscribe((ret) => {
            this.uxMessageService.handleSuccess('Task deleted');
            this.router.navigate(['org', this.orgId, 'tasks']);
          },
          (err) => this.uxMessageService.handleError(err)
        );
      }
    });
  }


  back() {
    window.history.back();
  }

}
