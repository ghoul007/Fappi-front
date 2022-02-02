import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListProcessViewComponent} from './components/list-process/list-process-view.component';
import {AddProcessViewComponent} from './components/add-process/add-process-view.component';
import {EditProcessViewComponent} from './components/edit-process/edit-process-view.component';

const routes: Routes = [
  {path: 'process', component: ListProcessViewComponent},
  {path: 'process/add', component: AddProcessViewComponent},
  {path: 'process/edit/:id', component: EditProcessViewComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBpmnRoutingModule {
}
