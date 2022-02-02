import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GlobalWrapperComponent} from './ux/global-wrapper/global-wrapper.component';
import {SubWrapperComponent} from './ux/sub-wrapper/sub-wrapper.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/org/default/chapters',
    pathMatch: 'full'
  },
  {
    path: 'org/:orgId',
    component: GlobalWrapperComponent,
    children: [
      {
        path: '',
        component: SubWrapperComponent,
        children: [
          {path: 'chapters', loadChildren: () => import('./module/cms-module/cms.module').then(m => m.CmsModule)},
          {path: 'tasks', loadChildren: () => import('./module/admin-tasks/admin-task.module').then(m => m.AdminTaskModule)},
          {path: 'medias', loadChildren: () => import('./module/media/media.module').then(m => m.MediaModule)},
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
