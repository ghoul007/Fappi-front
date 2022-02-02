import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProcessDefinitionIdDto, ProcessService, StartProcessInstancePayloadDto, UpdateProcessDto} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-edit-process-view',
  templateUrl: './edit-process-view.component.html',
  styleUrls: ['./edit-process-view.component.scss']
})
export class EditProcessViewComponent {

  editProcessForm: FormGroup;
  orgId: string;
  id: string;
  key: string;
  /////
  startProcessFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private processService: ProcessService, private route: ActivatedRoute, private router: Router,
              private uxMessageService: UXMessageService) {
    this.orgId = this.route.parent.parent.snapshot.params.orgId;

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.editProcessForm = this.fb.group({
        name: ['', Validators.required],
        contentXml: ['', Validators.required],
      });

      this.processService.find(this.orgId, this.id).subscribe((process) => {
        this.key = process.key;
        this.editProcessForm.patchValue({
          name: process.key
        });
      });

      // and then get the content:
      this.processService.loadBpmFile(this.orgId, this.id).subscribe((content) => {
        this.editProcessForm.patchValue({
          contentXml: content
        });
      });

      this.initStartProcessForm();


    });
  }

  modelerSave(xml: string) {
    this.editProcessForm.patchValue({
      contentXml: xml
    });
    this.onSubmitForm();
  }

  onSubmitForm() {
    const formValue = this.editProcessForm.value;
    const updateDto = new UpdateProcessDto();
    updateDto.processDefinitionId = new ProcessDefinitionIdDto(this.orgId, this.id);
    updateDto.name = formValue.name;
    updateDto.contentXml = formValue.contentXml;

    this.processService.update(updateDto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Process added');
        setTimeout(() => {
          this.router.navigate(['org', this.orgId, 'process', 'process', 'edit', ret.id]);
        }, 500);
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  back() {
    window.history.back();
  }

  initStartProcessForm() {
    this.startProcessFormGroup = this.fb.group({
      name: ['', Validators.required],
      variables: ['', Validators.required],
    });
  }

  onStartManualProcess() {
    const formValue = this.startProcessFormGroup.value;
    const updateDto = new StartProcessInstancePayloadDto();
    updateDto.name = formValue.name;
    updateDto.variables = JSON.parse(formValue.variables);
    this.processService.startProcess(this.orgId, this.id, updateDto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Process started');
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

}
