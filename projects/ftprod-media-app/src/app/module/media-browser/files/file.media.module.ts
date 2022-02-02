import {NgModule} from '@angular/core';
import {SearchFileComponent} from './search/search-file.component';
import {CommonModule} from '@angular/common';
import {CommonsLibsModule} from '../../common-libs/commons-libs.module';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';
import {FileRoutingMediaModule} from './file-routing.media.module';
import {FappiNgMediaModule} from 'fappi-ng-media';


@NgModule({
  declarations: [SearchFileComponent],
  imports: [
    CommonModule,
    CommonsLibsModule,
    FileRoutingMediaModule,
    FappiNgUtilsComponentsModule,
    FappiNgMediaModule
  ],
})
export class FileMediaModule {
}
