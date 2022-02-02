import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditProfilViewComponent} from './edit-profil/edit-profil.component';

const routes: Routes = [
  {
    path: '',
    component: EditProfilViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProfilRoutingModule {
}
