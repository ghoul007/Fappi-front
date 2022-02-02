import {NgModule} from '@angular/core';
import {ListOrganizationsViewComponent} from './components/list-organizations-view/list-organizations-view.component';
import {AdminOrganizationRoutingModule} from './admin-organization-routing.module';
import {AddOrganizationViewComponent} from './components/add-organization-view/add-organization-view.component';
import {ShowOrganizationViewComponent} from './components/show-organization-view/show-organization-view.component';
import {MainComponentsModule} from '../main-components/main-components.module';
import {CommonModule} from '@angular/common';
import {ProjectLibsModule} from '../project-libs-module';
import {AddOrgMemberComponent} from './components/show-organization-view/dialogs/add-org-member.component';


@NgModule({
  declarations: [ListOrganizationsViewComponent, AddOrganizationViewComponent, ShowOrganizationViewComponent, AddOrgMemberComponent],
  imports: [
    CommonModule,
    ProjectLibsModule,
    MainComponentsModule,
    AdminOrganizationRoutingModule,
  ],
  entryComponents: [AddOrgMemberComponent]
})
export class AdminOrganizationModule {
}
