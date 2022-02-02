import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddClientViewComponent} from './components/add-client/add-client.component';
import {ShowClientViewComponent} from './components/show-client/show-client-view.component';
import {ListClientsViewComponent} from './components/list-clients/list-clients-view.component';
import {ListDatabasesViewComponent} from './components/list-databases/list-databases-view.component';
import {ShowDatabaseViewComponent} from './components/show-database/show-database-view.component';
import {AddDatabaseViewComponent} from './components/add-database/add-database-view.component';
import {AddEncryptionConfigComponent} from './components/add-encryption-config/add-encryption-config.component';


const routes: Routes = [
  {path: '', component: ListClientsViewComponent},
  {path: 'edit/:id', component: ShowClientViewComponent},
  {path: 'add', component: AddClientViewComponent},
  {path: 'databases', component: ListDatabasesViewComponent},
  {path: 'databases/edit/:id', component: ShowDatabaseViewComponent},
  {path: 'databases/add', component: AddDatabaseViewComponent},
  {path: 'edit/:id/crypto-config/add', component: AddEncryptionConfigComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class SuperAdminClientRoutingModule {
}
