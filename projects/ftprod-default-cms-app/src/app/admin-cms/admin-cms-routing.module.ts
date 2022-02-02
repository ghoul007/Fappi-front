import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListSitesViewComponent} from './list-sites-view/list-sites-view.component';
import {AddSiteViewComponent} from './add-site-view/add-site-view.component';
import {ShowSiteViewComponent} from './show-site-view/show-site-view.component';
import {AddNodeTypeViewComponent} from './add-content-type-view/add-node-type-view.component';
import {EditNodeTypeViewComponent} from './edit-content-type-view/edit-node-type-view.component';
import {ManagementWrapperComponent} from './manage-site/management-wrapper.component';
import {ManageContentTypesComponent} from './manage-site/manage-content-types/manage-content-types.component';
import {ManageRightsComponent} from './manage-site/manage-rights/manage-rights.component';
import {ManageChannelsComponent} from './manage-site/manage-channels/manage-channels.component';
import {AddChannelComponent} from './manage-site/add-channel/add-channel.component';
import {ManageActionsComponent} from './manage-site/manage-actions/manage-actions.component';
import {ManageVersionsComponent} from './manage-site/manage-versions/manage-versions.component';

const routes: Routes = [
  {path: 'sites', component: ListSitesViewComponent},
  {path: 'sites/add', component: AddSiteViewComponent},
  {path: 'sites/edit/:slug', component: ShowSiteViewComponent},

  {path: 'sites/admin/:slug', component: ManagementWrapperComponent, children: [
    // content types:
      {path: 'content-types', component: ManageContentTypesComponent},
      {path: 'content-types/node-type/add', component: AddNodeTypeViewComponent},
      {path: 'content-types/node-type/edit/:attachedElementId/:nodeTypeSlug', component: EditNodeTypeViewComponent},
      // rights:
      {path: 'rights', component: ManageRightsComponent},
      // channels
      {path: 'channels', component: ManageChannelsComponent},
      {path: 'channels/add', component: AddChannelComponent},

      // actions:
      {path: 'actions', component: ManageActionsComponent},

      // versions:
      {path: 'versions', component: ManageVersionsComponent},

    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSiteRoutingModule {
}
