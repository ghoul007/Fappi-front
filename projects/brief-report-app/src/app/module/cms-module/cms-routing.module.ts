import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListChapterComponent} from './components/list-chapters/list-chapter.component';
import {CommonsLibsModule} from '../common-libs/commons-libs.module';
import {AddChapterComponent} from './components/add-chapter/add-chapter.component';
import {EditChapterComponent} from './components/edit-chapter/edit-chapter.component';
import {ListContributionsComponent} from './components/list-contributions/list-contributions.component';
import {ChapterPreferencesComponent} from './components/chapter-preferences/chapter-preferences.component';
import {AddNodeTypeViewComponent} from './components/add-content-type-view/add-node-type-view.component';
import {EditNodeTypeViewComponent} from './components/edit-content-type-view/edit-node-type-view.component';
import {ManagementWrapperComponent} from './components/manage-site/management-wrapper.component';
import {ManageContentTypesComponent} from './components/manage-site/manage-content-types/manage-content-types.component';
import {ManageRightsComponent} from './components/manage-site/manage-rights/manage-rights.component';
import {ManageChannelsComponent} from './components/manage-site/manage-channels/manage-channels.component';
import {AddChannelComponent} from './components/manage-site/add-channel/add-channel.component';
import {ManageActionsComponent} from './components/manage-site/manage-actions/manage-actions.component';
import {ManageVersionsComponent} from './components/manage-site/manage-versions/manage-versions.component';


const routes: Routes = [
  {path: '', component: ListChapterComponent},
  {path: 'add', component: AddChapterComponent},
  {path: 'edit/:slug', component: EditChapterComponent},
  {path: 'contributions', component: ListContributionsComponent},
  {path: 'admin/:slug', component: ManagementWrapperComponent, children: [
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
    RouterModule.forChild(routes),
    CommonsLibsModule],
  exports: [RouterModule]
})
export class CmsRoutingModule {
}
