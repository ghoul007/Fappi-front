import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchFileComponent} from './search/search-file.component';
import {CommonsLibsModule} from '../../common-libs/commons-libs.module';

const routes: Routes = [
  {path: 'search', component: SearchFileComponent},
  {path: '', redirectTo: 'search', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonsLibsModule],
  exports: [RouterModule]
})
export class FileRoutingMediaModule {
}
