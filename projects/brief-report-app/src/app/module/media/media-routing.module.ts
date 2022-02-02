import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonsLibsModule} from '../common-libs/commons-libs.module';
import {ViewMediaComponent} from './components/view-media/view-media.component';


const routes: Routes = [
  {path: '', component: ViewMediaComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonsLibsModule],
  exports: [RouterModule]
})
export class MediaRoutingModule {
}
