import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WrapperComponent} from './wrapper/wrapper.component';
import {ContactAdminComponent} from './contact/contact-admin/contact-admin.component';
import {ContactFieldsComponent} from './contact/contact-fields/contact-fields.component';
import {CommonsLibsModule} from '../../common-libs/commons-libs.module';

const routes: Routes = [
  {
    path: '', component: WrapperComponent,
    children: [
      {
        path: 'contact-admin',
        component: ContactAdminComponent
      },
      {
        path: 'contact-fields',
        component: ContactFieldsComponent
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
export class CrmClientRoutingAdminModule {
}
