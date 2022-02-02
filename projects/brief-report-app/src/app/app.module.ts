import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, Injectable, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';
import {GlobalWrapperComponent} from './ux/global-wrapper/global-wrapper.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonsLibsModule} from './module/common-libs/commons-libs.module';
import {AuthInterceptor, FappiUrlService} from 'fappi-common-model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmDialog, FappiNgMaterialKitModule} from 'fappi-ng-material-kit';
import {environment} from '../environments/environment';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {SubWrapperComponent} from './ux/sub-wrapper/sub-wrapper.component';
import {FappiNgMediaModule} from 'fappi-ng-media';

@Injectable()
export class MyFappiUrlService extends FappiUrlService {
  apiBaseUrl = environment.FAPPI_BASE_URL;
}

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    GlobalWrapperComponent,
    SubWrapperComponent
  ],
  entryComponents: [ConfirmDialog],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonsLibsModule,
    HttpClientModule,
    FappiNgUtilsComponentsModule,
    FappiNgMaterialKitModule,
    FappiNgMediaModule

  ],
  providers: [
    {
      provide: FappiUrlService,
      useClass: MyFappiUrlService
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {
}
