import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuSuperadminComponentComponent} from './ux/superadmin/menu-superadmin-component.component';
import {GlobalWrapperComponent} from './ux/global-wrapper/global-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalWrapperComponent,
  },

  {
    path: 'superadmin',
    component: GlobalWrapperComponent,
    children: [{
      path: 'clients',
      loadChildren: () => import('./superadmin/clients/superadmin-client.module').then(m => m.SuperAdminClientModule)
    },
      {
        path: 'admin/custom', loadChildren: () => import('./admin-personalization/admin-personalization.module')
          .then(m => m.AdminPersonalizationModule)
      },
      {path: '', redirectTo: 'clients', pathMatch: 'full'},
    ]
  },
  {
    path: 'org/:orgId',
    component: GlobalWrapperComponent,
    children: [
      {path: 'admin/users', loadChildren: () => import('./admin-user/admin-user.module').then(m => m.AdminUserModule)},
      {path: 'profil', loadChildren: () => import('./module/profil/profil.module').then(m => m.ProfilModule)},
      {path: 'tasks', loadChildren: () => import('./admin-tasks/admin-task.module').then(m => m.AdminTaskModule)},
      {path: 'admin/groups', loadChildren: () => import('./admin-group/admin-group.module').then(m => m.AdminGroupModule)},
      {path: 'admin/audit', loadChildren: () => import('./admin-audit/admin-audit.module').then(m => m.AdminAuditModule)},
      {
        path: 'admin/custom', loadChildren: () => import('./admin-personalization/admin-personalization.module')
          .then(m => m.AdminPersonalizationModule)
      },
      {
        path: 'admin/organizations',
        loadChildren: () => import('./admin-organization/admin-organization.module').then(m => m.AdminOrganizationModule)
      },
      {path: 'admin/process', loadChildren: () => import('./admin-bpmn/admin-bpmn.module').then(m => m.AdminBpmnModule)},
      {path: '', redirectTo: 'admin/users', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
