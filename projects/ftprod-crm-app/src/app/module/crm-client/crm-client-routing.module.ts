import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CrmWrapperComponent} from './crm-wrapper.component';
import {CommonsLibsModule} from '../common-libs/commons-libs.module';

const routes: Routes = [

  {
    path: '',
    component: CrmWrapperComponent,
    children: [
      {
        path: 'contact',
        loadChildren: () => import('./contact/crm-client.contact.module').then(m => m.CrmClientContactModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/crm-client.admin.module').then(m => m.CrmClientContactModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonsLibsModule],
  exports: [RouterModule]
})
export class CrmClientRoutingModule {
}
