import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponentsModule} from '../main-components/main-components.module';
import {ListAuditViewComponent} from './components/list-audit-view/list-audit-view.component';
import {AdminAuditRoutingModule} from './admin-audit-routing.module';
import {ProjectLibsModule} from '../project-libs-module';

@NgModule({
  declarations: [ListAuditViewComponent],
  imports: [
    CommonModule,
    ProjectLibsModule,
    MainComponentsModule,
    AdminAuditRoutingModule,
  ]
})
export class AdminAuditModule {
}
