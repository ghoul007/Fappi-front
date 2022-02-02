import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrmWrapperComponent} from './crm-wrapper.component';
import {CrmClientRoutingModule} from './crm-client-routing.module';
import {ProfilBadgeComponent} from './commons-components/profil-badge/profil-badge.component';
import {SearchActivityComponent} from './commons-components/search-activity/search-activity.component';
import {CommonsLibsModule} from '../common-libs/commons-libs.module';


@NgModule({
  declarations: [CrmWrapperComponent, ProfilBadgeComponent, SearchActivityComponent],
  exports: [
    ProfilBadgeComponent, SearchActivityComponent
  ],
  imports: [
    CommonModule,
    CommonsLibsModule,
    CrmClientRoutingModule,
  ]
})
export class CrmClientModule {
}
