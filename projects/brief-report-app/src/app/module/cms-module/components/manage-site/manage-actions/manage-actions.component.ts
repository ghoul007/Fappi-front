import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateSiteDto, DeleteSiteDto, OrgElementSlugDto, SiteResource, SiteService} from 'fappi-common-model';
import {ConfirmDialog, UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';

@Component({
  templateUrl: './manage-actions.component.html',
  styleUrls: ['./manage-actions.component.scss']
})
export class ManageActionsComponent {

  orgId: string;
  slug: string;

  constructor(private fb: FormBuilder, private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService, public dialog: MatDialog) {

    this.route.parent.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.orgId = this.route.parent.parent.parent.snapshot.params.orgId;
    });
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteConfirm();
      }
    });
  }

  private deleteConfirm() {
    const id = new OrgElementSlugDto();
    id.organizationId = this.orgId;
    id.elementId = this.slug;
    const deleteDto = new DeleteSiteDto();
    deleteDto.id = id;
    this.siteService.deleteSite(deleteDto).subscribe((sites) => {
        this.uxMessageService.handleSuccess('Deleted');
        window.location.href = window.location.href;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }
}
