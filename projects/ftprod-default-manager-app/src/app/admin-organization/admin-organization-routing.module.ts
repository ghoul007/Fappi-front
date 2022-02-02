import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListOrganizationsViewComponent} from './components/list-organizations-view/list-organizations-view.component';
import {AddOrganizationViewComponent} from './components/add-organization-view/add-organization-view.component';
import {ShowOrganizationViewComponent} from './components/show-organization-view/show-organization-view.component';

const routes: Routes = [
  {path: '', component: ListOrganizationsViewComponent},
  {path: 'add', component: AddOrganizationViewComponent},
  {path: 'edit/:id', component: ShowOrganizationViewComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOrganizationRoutingModule {
}
