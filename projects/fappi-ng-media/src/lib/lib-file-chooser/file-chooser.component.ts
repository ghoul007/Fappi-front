import {Component, Inject, OnInit} from '@angular/core';
import {MediaResource} from 'fappi-common-model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  templateUrl: './file-chooser.component.html',
  styleUrls: ['./file-chooser.component.scss']
})
export class FileChooserComponent implements OnInit {

  public orgId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uxMessageService: UXMessageService
  ) {
    this.orgId = data.orgId;
  }

  fileChoose(mediaResource: MediaResource) {
    this.data.media = mediaResource;
  }

  ngOnInit() {

  }

}
