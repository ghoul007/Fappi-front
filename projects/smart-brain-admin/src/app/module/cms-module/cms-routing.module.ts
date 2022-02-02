import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonsLibsModule} from '../common-libs/commons-libs.module';
import {ListClientsComponent} from './components/list-clients/list-clients.component';
import {AddClientComponent} from './components/add-client/add-client.component';
import {EditClientComponent} from './components/edit-client/edit-client.component';
import {ShowUserViewComponent} from './components/show-user-view/show-user-view.component';
import {AddUserViewComponent} from './components/add-user/add-user.component';



const routes: Routes = [
  {path: '', component: ListClientsComponent},
  {path: 'add', component: AddClientComponent},
  {path: 'edit/:id', component: EditClientComponent},
  {path: 'edit/:orgId/users/edit/:id', component: ShowUserViewComponent},
  {path: 'edit/:orgId/users/add', component: AddUserViewComponent}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonsLibsModule],
  exports: [RouterModule]
})
export class CmsRoutingModule {
}
