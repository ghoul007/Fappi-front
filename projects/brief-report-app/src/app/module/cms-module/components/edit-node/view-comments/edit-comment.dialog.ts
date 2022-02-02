import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  templateUrl: 'edit-comment.component.html',
})
export class EditCommentDialog {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }


  submitAction(action: any) {
    this.data.outcomeAction = action;
    this.dialogRef.close(this.data);
  }
}
