import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListUsersViewComponent} from './components/list-users-view/list-users-view.component';
import {ShowUserViewComponent} from './components/show-user-view/show-user-view.component';
import {EditRolesViewComponent} from './components/edit-roles/edit-roles.component';
import {AddUserViewComponent} from './components/add-user/add-user.component';
import {AdminUserRoutingModule} from './admin-user-routing.module';
import {EditUserViewComponent} from './components/edit-user/edit-user.component';
import {UserAccountActionsComponent} from './components/useraccount-actions/useraccount-actions.component';
import {ResetPasswordDialogComponent} from './components/useraccount-actions/reset-password-dialog/reset-password-dialog.component';
import {CommonsLibsModule} from '../common-libs/commons-libs.module';
import {FappiNgMaterialKitModule} from 'fappi-ng-material-kit';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';
import {FappiNgMediaModule} from 'fappi-ng-media';
import {MainComponentsModule} from '../main-components/main-components.module';

@NgModule({
  declarations: [ListUsersViewComponent, ShowUserViewComponent, EditRolesViewComponent, AddUserViewComponent,
    UserAccountActionsComponent, EditUserViewComponent, ResetPasswordDialogComponent],
  exports: [EditUserViewComponent],
  imports: [
    CommonModule,
    AdminUserRoutingModule,
    MainComponentsModule,
    CommonsLibsModule,
    FappiNgMaterialKitModule,
    FappiNgUtilsComponentsModule,
    FappiNgMediaModule
  ]
})
export class AdminUserModule {
}
