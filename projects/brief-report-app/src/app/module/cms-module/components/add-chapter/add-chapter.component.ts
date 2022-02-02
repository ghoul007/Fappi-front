import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateSiteDto, SiteService, TaskService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {StartProcessInstancePayloadDto} from "../../../../../../../fappi-common-model/src/lib/domain/task/StartProcessInstancePayloadDto";

@Component({
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss'],
  styles: ['body{background:red !important}']
})
export class AddChapterComponent {


  createSiteForm: FormGroup;

  orgId: string;

  constructor(private fb: FormBuilder, private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService, private taskService: TaskService) {

    this.orgId = this.route.parent.parent.snapshot.params.orgId;

    this.createSiteForm = this.fb.group({
      slug: ['', Validators.required],
      name: ['', Validators.required],
      organizationId: [this.orgId, Validators.required],
    });
  }

  onSubmitForm() {
    const formValue = this.createSiteForm.value;
    const site = new CreateSiteDto();
    // if scope global, we add the content type for site 0.
    site.id.elementId = formValue.slug;
    site.id.organizationId = formValue.organizationId;
    site.engine = 'oak';
    site.name = formValue.name;
    this.siteService.addSite(site).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Site added');

        // we start the workflow associated with the content:
        const startProcessInstancePayloadDto = new StartProcessInstancePayloadDto();
        startProcessInstancePayloadDto.name = formValue.name;
        startProcessInstancePayloadDto.variables = {
          briefReport: true,
          orgId: this.orgId,
          chapterId: site.id.elementId
        };
        this.taskService.start(this.orgId, 'asn-review-process', startProcessInstancePayloadDto).subscribe((r) => {
          console.log(r);
        });
        this.router.navigate(['org', this.orgId, 'chapters', 'edit', ret.elementId]);
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  back() {
    window.history.back();
  }

}
