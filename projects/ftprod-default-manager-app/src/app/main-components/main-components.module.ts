import {NgModule} from '@angular/core';
import {ListUsersComponent} from './list-users/list-users.component';

import {ListGroupsComponent} from './list-groups/list-groups.component';
import {SelectUserDialog} from './dialogs/select-user.dialog';
import {ProjectLibsModule} from '../project-libs-module';


@NgModule({
  declarations: [ListUsersComponent, ListGroupsComponent,
    SelectUserDialog],
  entryComponents: [SelectUserDialog],
  imports: [
    ProjectLibsModule,
  ], exports: [ListUsersComponent,
    ListGroupsComponent]
})
export class MainComponentsModule {
}
