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
      {path: 'media', loadChildren: () => import('./module/media-browser/media-client.module').then(m => m.MediaClientModule)},
      {path: '', redirectTo: 'media', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
