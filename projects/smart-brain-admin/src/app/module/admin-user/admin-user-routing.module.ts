import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListUsersViewComponent} from './components/list-users-view/list-users-view.component';
import {ShowUserViewComponent} from './components/show-user-view/show-user-view.component';
import {AddUserViewComponent} from './components/add-user/add-user.component';

const routes: Routes = [
  {path: '', component: ListUsersViewComponent},
  {path: 'edit/:id', component: ShowUserViewComponent},
  {path: 'add', component: AddUserViewComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule {
}
