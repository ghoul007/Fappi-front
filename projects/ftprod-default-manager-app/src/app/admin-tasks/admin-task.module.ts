import {NgModule} from '@angular/core';
import {AdminTaskRoutingModule} from './admin-task-routing.module';
import {ListTasksViewComponent} from './components/list-tasks-view/list-tasks-view.component';
import {ShowTaskViewComponent} from './components/show-task-view/show-task-view.component';
import {MainComponentsModule} from '../main-components/main-components.module';
import {ProjectLibsModule} from '../project-libs-module';


@NgModule({
  declarations: [ListTasksViewComponent, ShowTaskViewComponent],
  imports: [
    ProjectLibsModule,
    MainComponentsModule,
    AdminTaskRoutingModule,

  ]
})
export class AdminTaskModule {
}
