import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AddProcessDto, ProcessDefinitionIdDto, ProcessService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-add-process-view',
  templateUrl: './add-process-view.component.html',
  styleUrls: ['./add-process-view.component.scss']
})
export class AddProcessViewComponent {

  createProcessForm: FormGroup;
  orgId: string;

  constructor(private fb: FormBuilder, private processService: ProcessService, private route: ActivatedRoute, private router: Router,
              private uxMessageService: UXMessageService) {
    this.orgId = this.route.parent.parent.snapshot.params.orgId;
    this.createProcessForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      contentXml: ['', Validators.required],
    });
  }

  onSubmitForm() {
    const formValue = this.createProcessForm.value;
    const addProcessDto = new AddProcessDto();
    addProcessDto.processDefinitionId = new ProcessDefinitionIdDto(this.orgId, formValue.id);
    addProcessDto.name = formValue.name;
    addProcessDto.contentXml = formValue.contentXml;
    this.processService.add(addProcessDto).subscribe((ret) => {
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


}
