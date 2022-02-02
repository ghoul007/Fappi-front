import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MediaResource, MediaService} from 'fappi-common-model';
import {MatDialog} from '@angular/material/dialog';
import {UploadMediaComponent} from '../lib-upload-media/upload-media.component';

@Component({
  selector: 'lib-media-browser',
  templateUrl: './media-browser.component.html',
  styleUrls: ['./media-browser.component.scss']
})
export class MediaBrowserComponent implements OnInit {

  displayedColumns = ['name', 'size', 'action'];

  @Input()
  public orgId: string;

  @Input()
  public showDeleteButton = true;

  public currentFolder = '/';

  public medias: MediaResource[];

  public selectedFile: MediaResource;

  public showUpload = false;

  @Output()
  public selectedFileChoose: EventEmitter<MediaResource> = new EventEmitter<MediaResource>();

  constructor(private mediaService: MediaService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.mediaService.list(this.orgId, this.currentFolder, 0, 20).subscribe((medias) => {
      this.medias = medias;
    });
  }

  rowClicked(clicked: MediaResource) {
    this.selectedFile = clicked;
    this.selectedFileChoose.emit(this.selectedFile);
  }

  addFile() {
    const dialogRef = this.dialog.open(UploadMediaComponent, {
      width: '450px', data: {orgId: this.orgId}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.uploadDone) {
        setTimeout(() => this.refreshList(), 2000);
      }
    });
  }

  closeAddFile() {
    this.showUpload = false;
  }

  download(element: MediaResource) {
    window.open(`/media/${this.orgId}/files/${element.id}`, '_blank');
  }

  delete(element: MediaResource) {
    this.mediaService.delete(this.orgId, element).subscribe(() => {
      // display message
      setTimeout(() => this.refreshList(), 2000);
    });
  }

}
