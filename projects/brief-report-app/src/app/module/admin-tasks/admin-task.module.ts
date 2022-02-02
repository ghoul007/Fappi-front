import {NgModule} from '@angular/core';
import {AdminTaskRoutingModule} from './admin-task-routing.module';
import {ListTasksViewComponent} from './components/list-tasks-view/list-tasks-view.component';
import {ShowTaskViewComponent} from './components/show-task-view/show-task-view.component';
import {CommonsLibsModule} from '../common-libs/commons-libs.module';
import {FormsModule} from '@angular/forms';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [ListTasksViewComponent, ShowTaskViewComponent],
  imports: [
    CommonModule,
    AdminTaskRoutingModule,
    CommonsLibsModule,
    FormsModule,
    FappiNgUtilsComponentsModule,
    MatToolbarModule,
  ]
})
export class AdminTaskModule {
}
