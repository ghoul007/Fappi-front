import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTasksViewComponent} from './components/list-tasks-view/list-tasks-view.component';
import {ShowTaskViewComponent} from './components/show-task-view/show-task-view.component';


const routes: Routes = [
  {path: '', component: ListTasksViewComponent},
  {path: 'edit/:id', component: ShowTaskViewComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminTaskRoutingModule {
}
