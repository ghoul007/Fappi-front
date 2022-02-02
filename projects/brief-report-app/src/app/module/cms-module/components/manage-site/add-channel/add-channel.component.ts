import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AddChannelDto, ChannelIdDto, CreateSiteDto, SiteService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss']
})
export class AddChannelComponent {


  addChannelForm: FormGroup;

  orgId: string;
  slug: string;

  constructor(private fb: FormBuilder, private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService) {

    this.route.parent.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.orgId = this.route.parent.parent.parent.snapshot.params.orgId;

      this.addChannelForm = this.fb.group({
        name: ['', Validators.required],
        organizationId: [this.orgId, Validators.required],
      });
    });
  }

  onSubmitForm() {
    const formValue = this.addChannelForm.value;
    const channel = new AddChannelDto();
    channel.id = new ChannelIdDto();
    channel.id.orgId = this.orgId;
    channel.id.siteId = this.slug;
    channel.id.channelSlug = formValue.name;

    this.siteService.addChannel(channel).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Channel added');
        this.router.navigate(['org', this.orgId, 'cms', 'sites', 'edit', ret.elementId]);
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  back() {
    window.history.back();
  }

}
