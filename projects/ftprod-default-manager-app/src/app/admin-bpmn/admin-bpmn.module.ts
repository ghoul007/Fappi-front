import {NgModule} from '@angular/core';
import {MainComponentsModule} from '../main-components/main-components.module';
import {CommonModule} from '@angular/common';
import {ListProcessViewComponent} from './components/list-process/list-process-view.component';
import {AdminBpmnRoutingModule} from './admin-bpmn-routing.module';
import {AddProcessViewComponent} from './components/add-process/add-process-view.component';
import {EditProcessViewComponent} from './components/edit-process/edit-process-view.component';
import {BpmModelerComponent} from './components/bpm-process-edit/bpm-modeler.component';
import {ProjectLibsModule} from '../project-libs-module';


@NgModule({
  declarations: [ListProcessViewComponent, AddProcessViewComponent, EditProcessViewComponent, BpmModelerComponent],
  imports: [
    CommonModule,
    ProjectLibsModule,
    MainComponentsModule,
    AdminBpmnRoutingModule,

  ]
})
export class AdminBpmnModule {
}
