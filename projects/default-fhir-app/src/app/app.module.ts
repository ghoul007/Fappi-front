import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayContainer} from '@angular/cdk/overlay';

import {MainMenuComponent} from './ux/main-menu/main-menu.component';

import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {getFrPaginatorIntl} from './ux/material-angular-i18n/fr-paginator-intl';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';
import {GlobalWrapperComponent} from './ux/global-wrapper/global-wrapper.component';
import {ProjectLibsModule} from './project-libs-module';
import {FappiUrlService} from 'fappi-common-model';
import {environment} from '../environments/environment';
import {FHIR_HTTP_CONFIG, FhirConfig} from 'ng-fhirjs';
import {Router} from '@angular/router';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeEn, 'en');

@Injectable()
export class MyFappiUrlService extends FappiUrlService {
  apiBaseUrl = environment.FAPPI_BASE_URL;
}


export const FHIR_JS_CONFIG: FhirConfig = {
  baseUrl: '/api/fhir/v1/repository/fhir',
  credentials: 'same-origin',
} as FhirConfig;

const fhirJsConfigFactory = (router: Router) => {
  return FHIR_JS_CONFIG;
};


@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    GlobalWrapperComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ProjectLibsModule,
    FappiNgUtilsComponentsModule
  ],
  providers: [// TODO handle all languages
    {provide: MatPaginatorIntl, useValue: getFrPaginatorIntl()},
    {
      provide: FappiUrlService,
      useClass: MyFappiUrlService
    },
    // we must set the provider in root because the fhir lib set provided in Root...
    {provide: FHIR_HTTP_CONFIG, useFactory: fhirJsConfigFactory}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('theme01');
    if ('ar' === document.getElementsByTagName('html')[0].getAttribute('lang')) {
      document.body.setAttribute('dir', 'rtl');
    }
  }
}
