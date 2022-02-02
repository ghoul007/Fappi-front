import {NgModule} from '@angular/core';
import {FappiNgMediaComponent} from './fappi-ng-media.component';
import {UploadMediaComponent} from './lib-upload-media/upload-media.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MediaBrowserComponent} from './lib-media-browser/media-browser.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {FileChooserComponent} from './lib-file-chooser/file-chooser.component';
import {OverlayContainer} from '@angular/cdk/overlay';
import {PrettyOctetPipe} from './pipe/PrettyOctetPipe';


@NgModule({
  declarations: [
    FappiNgMediaComponent,
    UploadMediaComponent,
    MediaBrowserComponent,
    FileChooserComponent,
    PrettyOctetPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  exports: [FappiNgMediaComponent, UploadMediaComponent, MediaBrowserComponent, FileChooserComponent],
  entryComponents: [FileChooserComponent, UploadMediaComponent]
})
export class FappiNgMediaModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('theme-01');
  }
}
