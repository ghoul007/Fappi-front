import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchContactComponent} from './search/search-contact.component';
import {CommonsLibsModule} from '../../common-libs/commons-libs.module';

const routes: Routes = [
  {path: '', component: SearchContactComponent},
  {path: 'show/:contactId', component: SearchContactComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonsLibsModule],
  exports: [RouterModule]
})
export class CrmClientContactRoutingModule {
}
