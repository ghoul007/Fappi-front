import {NgModule} from '@angular/core';
import {EditBarComponent} from './components/cms-edit-node/edit-bar.component';
import {CmsEditNodeTypesComponent} from './components/cms-edit-node/cms-edit-node.component';
import {CmsEditNodeComponent} from './components/cms-edit-node-types/cms-edit-node-types.component';
import {CmsNodeSelectorComponent} from './components/cms-node-selector/cms-node-selector.component';
import {CmsTreeComponent} from './components/cms-tree/cms-tree.component';
import {CreateNodeComponent} from './components/cms-tree/dialogs/create-node.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FappiNgUtilsComponentsModule} from 'fappi-ng-utils-components';
import {CmsEditRightsComponent} from './components/cms-edit-rights/cms-edit-rights.component';
import {EditPermissionComponent} from './components/cms-edit-rights/edit-permission/edit-permission.component';
import {FappiNgMediaModule} from 'fappi-ng-media';
import {CmsEditNodeTypesV2Component} from './components/cms-edit-node-v2/cms-edit-node-v2.component';
import {CmsExportSiteComponent} from './components/cms-export-site/cms-export-site.component';
import {CmsImportSiteComponent} from './components/cms-import-site/cms-import-site.component';
import {CmsAddSiteVersionComponent} from './components/cms-add-site-version/cms-add-site-version.component';
import {FappiNgMaterialKitModule} from "fappi-ng-material-kit";


@NgModule({
  declarations: [EditBarComponent, CmsEditNodeTypesComponent, CmsEditNodeTypesV2Component, CmsEditNodeComponent,
    CmsNodeSelectorComponent, CmsTreeComponent, CreateNodeComponent, CmsEditRightsComponent, EditPermissionComponent,
    CmsExportSiteComponent, CmsImportSiteComponent, CmsAddSiteVersionComponent],
  imports: [
    MatDatepickerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    DragDropModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatTreeModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatChipsModule,
    MatBadgeModule,
    MatToolbarModule,
    FappiNgUtilsComponentsModule,
    FappiNgMaterialKitModule,
    FappiNgMediaModule
  ],
  entryComponents: [CreateNodeComponent, CmsNodeSelectorComponent, CmsEditRightsComponent, CmsExportSiteComponent, CmsImportSiteComponent, CmsAddSiteVersionComponent],
  exports: [EditBarComponent, CmsEditNodeTypesComponent, CmsEditNodeComponent, CmsNodeSelectorComponent,
    CmsTreeComponent, CmsEditRightsComponent, EditPermissionComponent, CmsEditNodeTypesV2Component, CmsAddSiteVersionComponent]

})
export class FappiNgCmsModule {
}
