import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListUsersViewComponent} from './components/list-users-view/list-users-view.component';
import {ShowUserViewComponent} from './components/show-user-view/show-user-view.component';
import {EditRolesViewComponent} from './components/edit-roles/edit-roles.component';
import {AddUserViewComponent} from './components/add-user/add-user.component';
import {MainComponentsModule} from '../main-components/main-components.module';
import {AdminUserRoutingModule} from './admin-user-routing.module';
import {EditUserViewComponent} from './components/edit-user/edit-user.component';
import {ProjectLibsModule} from '../project-libs-module';
import {UserAccountActionsComponent} from './components/useraccount-actions/useraccount-actions.component';
import {ResetPasswordDialogComponent} from "./components/useraccount-actions/reset-password-dialog/reset-password-dialog.component";

@NgModule({
  declarations: [ListUsersViewComponent, ShowUserViewComponent, EditRolesViewComponent, AddUserViewComponent,
    UserAccountActionsComponent, EditUserViewComponent, ResetPasswordDialogComponent],
  exports: [EditUserViewComponent],
  imports: [
    CommonModule,
    ProjectLibsModule,
    MainComponentsModule,
    AdminUserRoutingModule,
  ]
})
export class AdminUserModule {
}
