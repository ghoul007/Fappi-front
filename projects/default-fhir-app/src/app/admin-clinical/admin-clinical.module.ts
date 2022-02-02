import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectLibsModule} from '../project-libs-module';
import {AdminClinicalRoutingModule} from './admin-clinical-routing.module';
import {PatientListComponent} from './pages/patient-list/patient-list.component';
import {PatientDetailComponent} from './pages/patient-detail/patient-detail.component';
import {AdminOrgViewComponent} from './pages/admin-org/admin-org-view.component';
import {NgFhirjsModule} from 'ng-fhirjs';
import {EncounterDetailComponent} from './pages/encounter-detail/encounter-detail.component';
import {EncounterListComponent} from './pages/encounter-list/encounter-list.component';
import {EpisodeDetailComponent} from './components/episode-detail/episode-detail.component';
import {CodeComponent} from './components/fhir-display/code/code.component';
import {CodeableConceptComponent} from './components/fhir-display/codeable-concept/codeable-concept.component';
import {ParticipantComponent} from './components/fhir-display/participant/participant.component';
import {PeriodComponent} from './components/fhir-display/period/period.component';
import {ReferenceComponent} from './components/fhir-display/reference/reference.component';
import {EpisodeListComponent} from './components/episode-list/episode-list.component';
import {ObservationDetailComponent} from './components/observation-detail/observation-detail.component';
import {ObservationListComponent} from './components/observation-list/observation-list.component';
import {ValueQuantityComponent} from './components/fhir-display/valueQuantity/valueQuantity.component';
import {IconRegistration} from 'fappi-ng-material-kit';
import {ValueCodeableConceptComponent} from './components/fhir-display/valueCodeableConcept/valueCodeableConcept.component';
import {OrganizationDetailComponent} from './pages/organization-detail/organization-detail.component';
import {AppOrganizationComponent} from './components/fhir-display/organization/organization.component';
import {PractitionerDetailComponent} from './pages/practitioner-detail/practitioner-detail.component';
import {MedicationsComponent} from './pages/patient-detail/medications/medications.component';
import {DiagnosisComponent} from './pages/patient-detail/diagnosis/diagnosis.component';
import {PractionerListPageComponent} from './pages/practitioner-list-page/practitioner-list-page.component';
import {OrganizationListPageComponent} from './pages/organization-list-page/organization-list-page.component';
import {ManageRightsComponent} from './pages/admin/manage-rights/manage-rights.component';
import {FhirOperationsComponent} from './pages/admin/fhir-operations/fhir-operations.component';
import {EditFhirPermissionComponent} from './components/edit-fhir-permission/edit-fhir-permission.component';
import {ManagementWrapperComponent} from './pages/admin/management-wrapper.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {RespiratoryRateGraphComponent} from './components/graphs/respiratory-rate-graph/respiratory-rate-graph.component';
import {MiniObservationStatComponent} from './components/mini-observation-stat/mini-observation-stat.component';


@NgModule({
  declarations: [PatientListComponent, PatientDetailComponent, AdminOrgViewComponent, EpisodeDetailComponent,
    EncounterDetailComponent, EncounterListComponent,
    CodeComponent, CodeableConceptComponent, ParticipantComponent, PeriodComponent, ReferenceComponent,
    EpisodeListComponent, ObservationDetailComponent, ObservationListComponent,
    ValueQuantityComponent, ValueCodeableConceptComponent, OrganizationDetailComponent, AppOrganizationComponent,
    PractitionerDetailComponent, MedicationsComponent, DiagnosisComponent, PractionerListPageComponent,
    OrganizationListPageComponent, ManageRightsComponent, FhirOperationsComponent, EditFhirPermissionComponent,
    ManagementWrapperComponent, RespiratoryRateGraphComponent, MiniObservationStatComponent
  ],
  imports: [
    CommonModule,
    ProjectLibsModule,
    NgFhirjsModule,
    AdminClinicalRoutingModule,
    NgxChartsModule
  ],
})
export class AdminClinicalModule {
  // trigger icon registration
  constructor(iconRegistration: IconRegistration) {
  }
}
