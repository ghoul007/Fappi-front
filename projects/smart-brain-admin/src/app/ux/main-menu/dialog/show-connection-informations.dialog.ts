import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-show-connection-informations',
  styleUrls: ['show-connection-information.scss'],
  templateUrl: 'show-connection-informations.component.html',
})
export class ShowConnectionInformationsDialog {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
}
