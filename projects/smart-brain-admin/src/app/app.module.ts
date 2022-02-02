import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

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
import {MainMenuComponent} from './ux/main-menu/main-menu.component';
import {ShowSiteViewComponent} from './profils-definition/show-site-view.component';
import {FappiNgCmsModule} from 'fappi-ng-cms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ShowConnectionInformationsDialog} from "./ux/main-menu/dialog/show-connection-informations.dialog";

@Injectable()
export class MyFappiUrlService extends FappiUrlService {
  apiBaseUrl = environment.FAPPI_BASE_URL;
}

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    GlobalWrapperComponent,
    ShowSiteViewComponent,
    ShowConnectionInformationsDialog
  ],
  entryComponents: [ConfirmDialog, ShowConnectionInformationsDialog],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonsLibsModule,
    HttpClientModule,
    FappiNgUtilsComponentsModule,
    FappiNgMaterialKitModule,
    FappiNgCmsModule,
    MatToolbarModule,

  ],
  providers: [
    {
      provide: FappiUrlService,
      useClass: MyFappiUrlService
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
