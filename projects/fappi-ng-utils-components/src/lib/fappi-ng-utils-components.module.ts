import {NgModule} from '@angular/core';
import {SelectOrganizationComponent} from './components/select-org/select-org-component.component';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppSelectorComponent} from './components/app-selector/app-selector.component';
import {
  BreadcrumbDirective,
  ContentWrapperComponent,
  LeftZoneDirective,
  MainZoneDirective,
  RightZoneDirective
} from './components/content-wrapper/content-wrapper.component';
import {CommonModule} from '@angular/common';
import {SlugGeneratorDirective} from './directives/slug-generator.directive';
import {FooterComponent} from './components/footer/app-footer.component';
import {HasroleDirective} from './directives/hasrole.directive';
import {HasGroupDirective} from './directives/hasgroup.directive';
import {CustomFieldsEditorComponent} from './components/custom-fields-editor/custom-fields-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectOrganizationLightComponent} from './components/select-org-light/select-org-light-component.component';
import {FappiNgMaterialKitModule} from 'fappi-ng-material-kit';
import {CardWrapperComponent} from './components/card-wrapper/card-wrapper.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {HasNotGroupDirective} from './directives/hasnotgroup.directive';


@NgModule({
  declarations: [SelectOrganizationComponent, SelectOrganizationLightComponent, AppSelectorComponent, ContentWrapperComponent,
    SlugGeneratorDirective, LeftZoneDirective, MainZoneDirective, RightZoneDirective, BreadcrumbDirective,
    FooterComponent, HasroleDirective, HasGroupDirective, CustomFieldsEditorComponent, CardWrapperComponent,
    HasNotGroupDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    FappiNgMaterialKitModule
  ],
  exports: [SelectOrganizationComponent, SelectOrganizationLightComponent, AppSelectorComponent, ContentWrapperComponent,
    SlugGeneratorDirective, LeftZoneDirective, FooterComponent, MainZoneDirective, RightZoneDirective, BreadcrumbDirective,
    HasroleDirective, HasGroupDirective, CustomFieldsEditorComponent, CardWrapperComponent, HasNotGroupDirective]
})
export class FappiNgUtilsComponentsModule {
}
