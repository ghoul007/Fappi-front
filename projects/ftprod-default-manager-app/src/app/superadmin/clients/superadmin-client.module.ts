import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddClientViewComponent} from './components/add-client/add-client.component';
import {MainComponentsModule} from '../../main-components/main-components.module';
import {SuperAdminClientRoutingModule} from './superadmin-client-routing.module';
import {ListClientsViewComponent} from './components/list-clients/list-clients-view.component';
import {ShowClientViewComponent} from './components/show-client/show-client-view.component';
import {ModuleEditComponent} from './components/module-edit/module-edit.component';
import {ProjectLibsModule} from '../../project-libs-module';
import {FappiNgMediaModule} from 'fappi-ng-media';
import {ListDatabasesViewComponent} from './components/list-databases/list-databases-view.component';
import {ShowDatabaseViewComponent} from './components/show-database/show-database-view.component';
import {AddDatabaseViewComponent} from './components/add-database/add-database-view.component';
import {SetClientDatabaseComponent} from './components/set-client-databases/set-client-database.component';
import {EncryptionListComponent} from './components/encryption-list/encryption-list.component';
import {AddEncryptionConfigComponent} from './components/add-encryption-config/add-encryption-config.component';

@NgModule({
  declarations: [AddClientViewComponent, ListClientsViewComponent, ShowClientViewComponent, ModuleEditComponent, ListDatabasesViewComponent,
    ShowDatabaseViewComponent, AddDatabaseViewComponent, SetClientDatabaseComponent, EncryptionListComponent,
    AddEncryptionConfigComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    ProjectLibsModule,
    MainComponentsModule,
    SuperAdminClientRoutingModule,
    FappiNgMediaModule
  ]
})
export class SuperAdminClientModule {
}
