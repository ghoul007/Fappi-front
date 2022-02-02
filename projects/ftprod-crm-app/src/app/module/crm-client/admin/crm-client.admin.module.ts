import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CrmClientModule} from '../crm-client.module';
import {CrmClientRoutingAdminModule} from './crm-client-routing.admin.module';
import {WrapperComponent} from './wrapper/wrapper.component';
import {ContactAdminComponent} from './contact/contact-admin/contact-admin.component';
import {ContactFieldsComponent} from './contact/contact-fields/contact-fields.component';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [WrapperComponent, ContactAdminComponent, ContactFieldsComponent],
  imports: [
    CommonModule,
    CrmClientRoutingAdminModule,
    CrmClientModule,
    MatListModule,
    FappiNgUtilsComponentsModule
  ]
})
export class CrmClientContactModule {
}
