import {NgModule} from '@angular/core';
import {ListUsersComponent} from './list-users/list-users.component';

import {ListGroupsComponent} from './list-groups/list-groups.component';
import {SelectUserDialog} from './dialogs/select-user.dialog';
import {CommonsLibsModule} from '../common-libs/commons-libs.module';
import {FappiNgMaterialKitModule} from 'fappi-ng-material-kit';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';
import {FappiNgMediaModule} from 'fappi-ng-media';


@NgModule({
  declarations: [ListUsersComponent, ListGroupsComponent,
    SelectUserDialog],
  entryComponents: [SelectUserDialog],
  imports: [
    CommonsLibsModule,
    FappiNgMaterialKitModule,
    FappiNgUtilsComponentsModule,
    FappiNgMediaModule,
  ], exports: [ListUsersComponent,
    ListGroupsComponent]
})
export class MainComponentsModule {
}
