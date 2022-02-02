import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuSuperadminComponentComponent} from './ux/superadmin/menu-superadmin-component.component';
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

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeEn, 'en');

@Injectable()
export class MyFappiUrlService extends FappiUrlService {
  apiBaseUrl = environment.FAPPI_BASE_URL;
}

@NgModule({
  declarations: [
    AppComponent,
    MenuSuperadminComponentComponent,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('theme01');
  }
}
