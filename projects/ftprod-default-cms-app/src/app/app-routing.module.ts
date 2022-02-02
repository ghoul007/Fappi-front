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
      {path: '', loadChildren: () => import('./main-board/main-board.module').then(m => m.MainBoardModule)},
      {path: 'cms', loadChildren: () => import('./admin-cms/admin-cms.module').then(m => m.AdminCmsModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
