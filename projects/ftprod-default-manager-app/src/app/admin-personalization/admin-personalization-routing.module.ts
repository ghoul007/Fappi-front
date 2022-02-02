import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditPersonalizationComponent} from './components/edit-personalization.component';


const routes: Routes = [
  {path: '', component: EditPersonalizationComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPersonalizationRoutingModule {
}
