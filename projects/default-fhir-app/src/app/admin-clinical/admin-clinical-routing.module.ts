import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientListComponent} from './pages/patient-list/patient-list.component';
import {PatientDetailComponent} from './pages/patient-detail/patient-detail.component';
import {AdminOrgViewComponent} from './pages/admin-org/admin-org-view.component';
import {EncounterDetailComponent} from './pages/encounter-detail/encounter-detail.component';
import {EncounterListComponent} from './pages/encounter-list/encounter-list.component';
import {OrganizationDetailComponent} from './pages/organization-detail/organization-detail.component';
import {PractitionerDetailComponent} from './pages/practitioner-detail/practitioner-detail.component';
import {OrganizationListPageComponent} from './pages/organization-list-page/organization-list-page.component';
import {PractionerListPageComponent} from './pages/practitioner-list-page/practitioner-list-page.component';
import {ManageRightsComponent} from './pages/admin/manage-rights/manage-rights.component';
import {FhirOperationsComponent} from './pages/admin/fhir-operations/fhir-operations.component';
import {ManagementWrapperComponent} from './pages/admin/management-wrapper.component';


const routes: Routes = [
 // {path: 'admin', component: AdminOrgViewComponent},
  {path: 'admin', component: ManagementWrapperComponent, children:
      [
        {path: 'rights', component: ManageRightsComponent},
        {path: 'operations', component: FhirOperationsComponent},
        {path: '', redirectTo: 'rights'}
      ]
    },
  {path: 'patient', component: PatientListComponent},
  {path: 'patient/:patientId', component: PatientDetailComponent},
  {path: 'encounter', component: EncounterListComponent},
  {path: 'encounter/:encounterId', component: EncounterDetailComponent},
  {path: 'organization', component: OrganizationListPageComponent},
  {path: 'organization/:organizationId', component: OrganizationDetailComponent},
  {path: 'practitioner', component: PractionerListPageComponent},
  {path: 'practitioner/:practitionerId', component: PractitionerDetailComponent},
  {path: '**', redirectTo: 'patient', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminClinicalRoutingModule {
}
