import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GlobalWrapperComponent} from './ux/global-wrapper/global-wrapper.component';
import {ShowSiteViewComponent} from './profils-definition/show-site-view.component';
import {ShowUserViewComponent} from '../../../ftprod-default-manager-app/src/app/admin-user/components/show-user-view/show-user-view.component';
import {AddUserViewComponent} from '../../../ftprod-default-manager-app/src/app/admin-user/components/add-user/add-user.component';
import {IsOrgAdminGuard} from './guards/IsOrgAdminGuard';
import {IsSuperAdminGuard} from "./guards/IsSuperAdminGuard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/org/default/clients',
    pathMatch: 'full'
  },
  {
    path: 'org/:orgId',
    component: GlobalWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full'
      },
      {path: 'clients', loadChildren: () => import('./module/cms-module/cms.module').then(m => m.CmsModule), canActivate: [IsSuperAdminGuard]},
      {path: 'admin/profils-definition', component: ShowSiteViewComponent, canActivate: [IsSuperAdminGuard]},
      {path: 'admin/users', loadChildren: () => import('./module/admin-user/admin-user.module')
          .then(m => m.AdminUserModule), canActivate: [IsOrgAdminGuard]
      },
      {path: 'admin/groups', loadChildren: () => import('./../../../ftprod-default-manager-app/src/app/admin-group/admin-group.module')
          .then(m => m.AdminGroupModule), canActivate: [IsSuperAdminGuard]},
      {path: 'profil', loadChildren: () => import('./../../../ftprod-default-manager-app/src/app/module/profil/profil.module').then(m => m.ProfilModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
