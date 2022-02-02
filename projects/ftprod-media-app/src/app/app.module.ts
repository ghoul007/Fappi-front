import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonsLibsModule} from './module/common-libs/commons-libs.module';
import {GlobalWrapperComponent} from './ux/global-wrapper/global-wrapper.component';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';
import {FappiUrlService} from 'fappi-common-model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {FappiNgMediaModule} from 'fappi-ng-media';
import {MainMenuComponent} from './ux/main-menu/main-menu.component';
import {FappiNgMaterialKitModule} from "fappi-ng-material-kit";


@Injectable()
export class MyFappiUrlService extends FappiUrlService {
  apiBaseUrl = environment.FAPPI_BASE_URL;
}


@NgModule({
  declarations: [
    AppComponent,
    GlobalWrapperComponent,
    MainMenuComponent
  ],
  imports: [
    CommonsLibsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FappiNgUtilsComponentsModule,
    FappiNgMediaModule,
    FappiNgMaterialKitModule,
  ],
  providers: [
    {
      provide: FappiUrlService,
      useClass: MyFappiUrlService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
