import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonsLibsModule} from './module/common-libs/commons-libs.module';
import {GlobalWrapperComponent} from './ux/global-wrapper/global-wrapper.component';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';
import {FappiUrlService} from 'fappi-common-model';
import {environment} from '../../../ftprod-default-manager-app/src/environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainMenuComponent} from './ux/main-menu/main-menu.component';


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
    FappiNgUtilsComponentsModule
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
