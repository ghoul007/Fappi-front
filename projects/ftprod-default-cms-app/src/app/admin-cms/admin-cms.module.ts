import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddSiteViewComponent} from './add-site-view/add-site-view.component';
import {ListSitesViewComponent} from './list-sites-view/list-sites-view.component';
import {ShowSiteViewComponent} from './show-site-view/show-site-view.component';
import {AdminSiteRoutingModule} from './admin-cms-routing.module';
import {AddNodeTypeViewComponent} from './add-content-type-view/add-node-type-view.component';
import {EditNodeTypeViewComponent} from './edit-content-type-view/edit-node-type-view.component';
import {ProjectLibsModule} from '../project-libs-module';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';
import {FappiNgMaterialKitModule} from 'fappi-ng-material-kit';
import {ManagementWrapperComponent} from './manage-site/management-wrapper.component';
import {ManageContentTypesComponent} from './manage-site/manage-content-types/manage-content-types.component';
import {ManageRightsComponent} from './manage-site/manage-rights/manage-rights.component';
import {ManageChannelsComponent} from './manage-site/manage-channels/manage-channels.component';
import {AddChannelComponent} from './manage-site/add-channel/add-channel.component';
import {ManageActionsComponent} from './manage-site/manage-actions/manage-actions.component';
import {ManageVersionsComponent} from './manage-site/manage-versions/manage-versions.component';


@NgModule({
  declarations: [ListSitesViewComponent, AddSiteViewComponent, ShowSiteViewComponent, AddNodeTypeViewComponent, EditNodeTypeViewComponent,
     ManagementWrapperComponent, ManageContentTypesComponent, ManageRightsComponent, ManageChannelsComponent, AddChannelComponent,
    ManageActionsComponent, ManageVersionsComponent],
  imports: [
    CommonModule,
    ProjectLibsModule,
    FappiNgUtilsComponentsModule,
    FappiNgMaterialKitModule,
    AdminSiteRoutingModule,
  ]
})
export class AdminCmsModule {
}
