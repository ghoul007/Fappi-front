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
      {path: 'dashboard', loadChildren: () => import('./main-board/main-board.module').then(m => m.MainBoardModule)},
      {path: 'clinical', loadChildren: () => import('./admin-clinical/admin-clinical.module').then(m => m.AdminClinicalModule)},
      {path: '', redirectTo: 'clinical', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
