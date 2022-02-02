import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateSiteDto, SiteService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-site-view',
  templateUrl: './add-site-view.component.html',
  styleUrls: ['./add-site-view.component.scss']
})
export class AddSiteViewComponent {


  createSiteForm: FormGroup;

  orgId: string;

  processing = false;

  constructor(private fb: FormBuilder, private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService) {

    this.orgId = this.route.parent.parent.snapshot.params.orgId;

    this.createSiteForm = this.fb.group({
      slug: ['', Validators.required],
      engine: ['oak', Validators.required],
      name: ['', Validators.required],
      organizationId: [this.orgId, Validators.required],
    });
  }

  onSubmitForm() {
    this.processing = true;
    const formValue = this.createSiteForm.value;
    const site = new CreateSiteDto();
    // if scope global, we add the content type for site 0.
    site.id.elementId = formValue.slug;
    site.id.organizationId = formValue.organizationId;
    site.engine = formValue.engine;
    site.name = formValue.name;
    this.siteService.addSite(site).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Site added');
        this.processing = false;
        this.router.navigate(['org', this.orgId, 'cms', 'sites', 'edit', ret.elementId]);
      },
      (err) => {
        this.uxMessageService.handleError(err);
        this.processing = false;
      }
    );
  }

  back() {
    window.history.back();
  }

}
