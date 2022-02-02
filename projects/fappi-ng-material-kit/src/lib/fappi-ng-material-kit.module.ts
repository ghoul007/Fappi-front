import {NgModule} from '@angular/core';
import {ConfirmDialog} from './components/confirm-dialog/confirm.dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProfilBadgeComponent} from './components/profil-badge/profil-badge.component';
import {LoadingZoneComponent} from './components/loading-zone/loading-zone.component';

@NgModule({
  declarations: [ConfirmDialog, ProfilBadgeComponent, LoadingZoneComponent],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  entryComponents: [ConfirmDialog],

  exports: [ConfirmDialog, ProfilBadgeComponent, LoadingZoneComponent]
})
export class FappiNgMaterialKitModule {
}
