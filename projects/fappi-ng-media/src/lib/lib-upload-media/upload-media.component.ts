import {FormBuilder, FormGroup} from '@angular/forms';
import {Component, Inject, OnInit} from '@angular/core';
import {MediaService} from 'fappi-common-model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.scss']
})
export class UploadMediaComponent implements OnInit {


  public orgId: string;
  public form: FormGroup;
  public error: string;
  public uploadResponse: any;
  public progressPercent = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uxMessageService: UXMessageService,
    private fb: FormBuilder, private mediaService: MediaService,
    public dialogRef: MatDialogRef<UploadMediaComponent>
  ) {
    this.orgId = data.orgId;
  }

  ngOnInit() {
    this.form = this.fb.group({
      media: ['']
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('media').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('media').value);
    formData.append('path', this.form.get('media').value.name);

    this.mediaService.upload(this.orgId, formData).subscribe(
      (res) => {
        if (res.done) {
          this.data.uploadDone = true;
          this.dialogRef.close(this.data);
        }
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
}
