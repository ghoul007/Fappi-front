import {NgModule} from '@angular/core';
import {SearchContactComponent} from './search/search-contact.component';
import {CommonModule} from '@angular/common';
import {CrmClientContactRoutingModule} from './crm-client-routing.contact.module';
import {AddContactViewComponent} from './add/add-contact.component';
import {EditContactViewComponent} from './edit/edit-contact.component';
import {CrmClientModule} from '../crm-client.module';
import {CommonsLibsModule} from '../../common-libs/commons-libs.module';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';


@NgModule({
  declarations: [SearchContactComponent, AddContactViewComponent, EditContactViewComponent],
  imports: [
    CommonModule,
    CommonsLibsModule,
    CrmClientContactRoutingModule,
    CrmClientModule,
    FappiNgUtilsComponentsModule
  ]
})
export class CrmClientContactModule {
}
