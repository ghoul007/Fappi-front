import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponentsModule} from '../main-components/main-components.module';
import {AdminGroupRoutingModule} from './admin-group-routing.module';
import {ListGroupsViewComponent} from './components/list-groups-view/list-groups-view.component';
import {ShowGroupViewComponent} from './components/show-group-view/show-group-view.component';
import {AddGroupViewComponent} from './components/add-group/add-group.component';
import {AddMemberComponent} from './components/show-group-view/dialogs/add-member.component';
import {ProjectLibsModule} from '../project-libs-module';

@NgModule({
  declarations: [ListGroupsViewComponent, ShowGroupViewComponent, AddGroupViewComponent, AddMemberComponent],
  entryComponents: [AddMemberComponent],
  imports: [
    CommonModule,
    ProjectLibsModule,
    MainComponentsModule,
    AdminGroupRoutingModule,
  ]
})
export class AdminGroupModule {
}
