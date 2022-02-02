import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MediaWrapperComponent} from './media-wrapper.component';
import {CommonsLibsModule} from '../common-libs/commons-libs.module';

const routes: Routes = [

  {
    path: '',
    component: MediaWrapperComponent,
    children: [
      {
        path: 'file',
        loadChildren: () => import('./files/file.media.module').then(m => m.FileMediaModule)
      },
      {path: '', redirectTo: 'file', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonsLibsModule],
  exports: [RouterModule]
})
export class MediaClientRoutingModule {
}
