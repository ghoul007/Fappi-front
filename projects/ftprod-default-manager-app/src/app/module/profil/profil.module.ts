import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponentsModule} from '../../main-components/main-components.module';
import {EditProfilViewComponent} from './edit-profil/edit-profil.component';
import {ProfilRoutingModule} from './profil-routing.module';
import {AdminUserModule} from '../../admin-user/admin-user.module';
import {ProjectLibsModule} from '../../project-libs-module';


@NgModule({
  declarations: [EditProfilViewComponent],
  exports: [
    EditProfilViewComponent
  ],
  imports: [
    CommonModule,
    ProjectLibsModule,
    MainComponentsModule,
    ProfilRoutingModule,
    AdminUserModule
  ]
})
export class ProfilModule {
}
