import {NgModule} from '@angular/core';
import {MainComponentsModule} from '../main-components/main-components.module';
import {CommonModule} from '@angular/common';
import {ProjectLibsModule} from '../project-libs-module';
import {EditPersonalizationComponent} from './components/edit-personalization.component';
import {AdminPersonalizationRoutingModule} from './admin-personalization-routing.module';
import {FappiNgMediaModule} from 'fappi-ng-media';


@NgModule({
  declarations: [EditPersonalizationComponent],
  imports: [
    CommonModule,
    ProjectLibsModule,
    AdminPersonalizationRoutingModule,
    MainComponentsModule,
    FappiNgMediaModule,
  ]
})
export class AdminPersonalizationModule {
}
