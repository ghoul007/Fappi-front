import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GlobalWrapperComponent} from './ux/global-wrapper/global-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalWrapperComponent,
  },
  {
    path: 'org/:orgId',
    component: GlobalWrapperComponent,
    children: [
      {path: 'crm', loadChildren: () => import('./module/crm-client/crm-client.module').then(m => m.CrmClientModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
