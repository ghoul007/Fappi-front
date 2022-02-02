import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonsLibsModule} from '../common-libs/commons-libs.module';
import {CmsRoutingModule} from './cms-routing.module';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';
import {FappiNgCmsModule} from 'fappi-ng-cms';
import {QuillModule} from 'ngx-quill';
import {FormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ListClientsComponent} from './components/list-clients/list-clients.component';
import {AddClientComponent} from './components/add-client/add-client.component';
import {EditClientComponent} from './components/edit-client/edit-client.component';
import {FappiNgMaterialKitModule} from 'fappi-ng-material-kit';
import {MatDialogModule} from '@angular/material/dialog';
import {ShowUserViewComponent} from './components/show-user-view/show-user-view.component';
import {AddUserViewComponent} from './components/add-user/add-user.component';
import {EditUserViewComponent} from './components/edit-user/edit-user.component';
import {MainComponentsModule} from "../main-components/main-components.module";

@NgModule({
  declarations: [ListClientsComponent, AddClientComponent, EditClientComponent, ShowUserViewComponent,
    AddUserViewComponent, EditUserViewComponent],
  imports: [
    CommonModule,
    CommonsLibsModule,
    MatDialogModule,
    FormsModule,
    CmsRoutingModule,
    FappiNgUtilsComponentsModule,
    FappiNgMaterialKitModule,
    FappiNgCmsModule,
    QuillModule.forRoot(),
    MatToolbarModule,
    MainComponentsModule
  ],
  entryComponents: []
})
export class CmsModule {
}
