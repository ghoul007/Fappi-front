import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AddCustomTypeDto, NodeTypeIdentifierDto, SiteService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-node-type-view',
  templateUrl: './add-node-type-view.component.html',
  styleUrls: ['./add-node-type-view.component.scss']
})
export class AddNodeTypeViewComponent {


  createNodeTypeForm: FormGroup;

  orgId: string;
  siteId: string;

  /**
   * True when sending information to the server
   */
  processing = false;

  constructor(private fb: FormBuilder, private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService) {

    this.route.parent.paramMap.subscribe(params => {
      this.orgId = this.route.parent.parent.parent.snapshot.params.orgId;
      this.siteId = params.get('slug');

      this.createNodeTypeForm = this.fb.group({
        name: ['', Validators.required],
        slug: ['', Validators.required],
        scopeGlobal: [true, Validators.required],
      });
    });
  }

  onSubmitForm() {
    this.processing = true;
    const formValue = this.createNodeTypeForm.value;
    const nodeTypeDto = new AddCustomTypeDto();
    const id = new NodeTypeIdentifierDto();
    id.slug = formValue.slug;
    id.id.elementId = formValue.scopeGlobal ? '0' : this.siteId;
    id.id.organizationId = this.orgId;
    nodeTypeDto.id = id;
    nodeTypeDto.name = formValue.name;
    this.siteService.addNodeType(nodeTypeDto).subscribe((ret) => {
        this.processing = false;
        this.uxMessageService.handleSuccess('Node type added');
        this.router.navigate(['/org', this.orgId, 'cms', 'sites', 'admin', this.siteId, 'content-types',
          'node-type', 'edit', id.id.elementId, nodeTypeDto.id.slug]);
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
