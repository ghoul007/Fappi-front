import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonsLibsModule} from '../common-libs/commons-libs.module';
import {CmsRoutingModule} from './cms-routing.module';
import {ListChapterComponent} from './components/list-chapters/list-chapter.component';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';
import {AddChapterComponent} from './components/add-chapter/add-chapter.component';
import {EditChapterComponent} from './components/edit-chapter/edit-chapter.component';
import {FappiNgCmsModule} from 'fappi-ng-cms';
import {EditNodeComponent} from './components/edit-node/edit-node.component';
import {QuillModule} from 'ngx-quill';
import {ViewCommentsComponent} from './components/edit-node/view-comments/view-comments.component';
import {FormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {StartWorkflowDialog} from './components/edit-chapter/start-workflow-popup/start-workflow.dialog';
import {ListContributionsComponent} from './components/list-contributions/list-contributions.component';
import {AddNodeTypeViewComponent} from './components/add-content-type-view/add-node-type-view.component';
import {EditNodeTypeViewComponent} from './components/edit-content-type-view/edit-node-type-view.component';
import {ChapterPreferencesComponent} from './components/chapter-preferences/chapter-preferences.component';
import {ManagementWrapperComponent} from './components/manage-site/management-wrapper.component';
import {ManageContentTypesComponent} from './components/manage-site/manage-content-types/manage-content-types.component';
import {ManageRightsComponent} from './components/manage-site/manage-rights/manage-rights.component';
import {ManageChannelsComponent} from './components/manage-site/manage-channels/manage-channels.component';
import {AddChannelComponent} from './components/manage-site/add-channel/add-channel.component';
import {ManageActionsComponent} from './components/manage-site/manage-actions/manage-actions.component';
import {ManageVersionsComponent} from './components/manage-site/manage-versions/manage-versions.component';
import {EditCommentDialog} from './components/edit-node/view-comments/edit-comment.dialog';


@NgModule({
  declarations: [ListChapterComponent, AddChapterComponent, EditChapterComponent, EditNodeComponent, ViewCommentsComponent,
    ListContributionsComponent, ChapterPreferencesComponent, AddNodeTypeViewComponent, EditNodeTypeViewComponent,
    StartWorkflowDialog,
    ManagementWrapperComponent, ManageContentTypesComponent, ManageRightsComponent,
    ManageChannelsComponent, AddChannelComponent, ManageActionsComponent,  ManageVersionsComponent, EditCommentDialog],
  imports: [
    CommonModule,
    CommonsLibsModule,
    FormsModule,
    CmsRoutingModule,
    FappiNgUtilsComponentsModule,
    FappiNgCmsModule,
    QuillModule.forRoot(),
    MatToolbarModule,

  ],
  entryComponents: [
    StartWorkflowDialog
  ]
})
export class CmsModule {
}
