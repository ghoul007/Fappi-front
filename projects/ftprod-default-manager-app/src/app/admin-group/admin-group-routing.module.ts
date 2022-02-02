import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListGroupsViewComponent} from './components/list-groups-view/list-groups-view.component';
import {ShowGroupViewComponent} from './components/show-group-view/show-group-view.component';
import {AddGroupViewComponent} from './components/add-group/add-group.component';


const routes: Routes = [
  {path: '', component: ListGroupsViewComponent},
  {path: 'edit/:id', component: ShowGroupViewComponent},
  {path: 'add', component: AddGroupViewComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminGroupRoutingModule {
}
