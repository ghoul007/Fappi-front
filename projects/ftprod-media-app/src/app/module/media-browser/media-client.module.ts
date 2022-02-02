import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MediaWrapperComponent} from './media-wrapper.component';
import {MediaClientRoutingModule} from './media-client-routing.module';

import {CommonsLibsModule} from '../common-libs/commons-libs.module';


@NgModule({
  declarations: [MediaWrapperComponent],
  exports: [],
  imports: [
    CommonModule,
    CommonsLibsModule,
    MediaClientRoutingModule,

  ]
})
export class MediaClientModule {
}
