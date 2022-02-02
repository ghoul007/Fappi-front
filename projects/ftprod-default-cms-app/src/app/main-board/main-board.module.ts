import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainBoardRoutingModule} from './main-board-routing.module';
import {BoardViewComponent} from './components/board-view/board-view.component';
import {ProjectLibsModule} from '../project-libs-module';

@NgModule({
  declarations: [BoardViewComponent],
  imports: [
    CommonModule,
    ProjectLibsModule,
    MainBoardRoutingModule
  ]
})
export class MainBoardModule {
}
