import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonsLibsModule} from '../common-libs/commons-libs.module';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';
import {FormsModule} from '@angular/forms';
import {MediaRoutingModule} from './media-routing.module';
import {ViewMediaComponent} from './components/view-media/view-media.component';

@NgModule({
  declarations: [ViewMediaComponent],
  imports: [
    CommonModule,
    CommonsLibsModule,
    FormsModule,
    MediaRoutingModule,
    FappiNgUtilsComponentsModule,

  ],
  entryComponents: []
})
export class MediaModule {
}
