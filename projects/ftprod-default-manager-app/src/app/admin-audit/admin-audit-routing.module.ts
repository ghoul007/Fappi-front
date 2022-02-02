import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListAuditViewComponent} from './components/list-audit-view/list-audit-view.component';


const routes: Routes = [
  {path: '', component: ListAuditViewComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminAuditRoutingModule {
}
