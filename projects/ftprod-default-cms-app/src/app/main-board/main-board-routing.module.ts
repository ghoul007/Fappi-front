import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardViewComponent} from './components/board-view/board-view.component';

const routes: Routes = [
  {path: '', component: BoardViewComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class MainBoardRoutingModule {
}
