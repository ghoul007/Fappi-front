import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  AddRootOrganizationDto,
  CreateNodeDto,
  CreateSiteDto,
  FappiUtils,
  NodeSlug,
  NodeTypeIdentifierDto,
  OrganizationService,
  OrgElementSlugDto,
  OrgSiteNodeSlugDto,
  SiteService
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {

  createSiteForm: FormGroup;

  orgId: string;

  loading = false;

  constructor(private fb: FormBuilder, private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService, private organizationService: OrganizationService) {

    this.orgId = this.route.parent.parent.snapshot.params.orgId;

    this.createSiteForm = this.fb.group({
      slug: ['', Validators.required],
      name: ['', Validators.required],
      organizationId: [this.orgId, Validators.required],
    });
    this.createSiteForm.patchValue({slug: 'c-' + FappiUtils.uuid().toLowerCase()});
  }

  generateAll() {

    this.addOrganization()
      .subscribe((o) => {
        this.addAdminSite().subscribe((s) => {
          this.addConfigFolder().subscribe(s2 => {
            this.addClientConfigNode().subscribe((s3) => {
        //      this.addClientsFolder().subscribe((s4) => {
                /*
                this.addLeadFolder().subscribe((s5) => {
                  this.addClientSite().subscribe((s6) => {
                    this.uxMessageService.handleSuccess('Client added');
                    return;
                  });
                });
                 */
                this.uxMessageService.handleSuccess('Client added');
                this.router.navigate(['/org', 'default', 'clients', 'edit', o.id.id]);
                return;
          //    });
            });
          });
        });
      });
  }

  onSubmitForm() {
    this.generateAll();
  }

  addAdminSite(): Observable<any> {
    this.loading = true;
    const formValue = this.createSiteForm.value;
    const site = new CreateSiteDto();
    // if scope global, we add the content type for site 0.
    site.id.elementId = formValue.slug;
    site.id.organizationId = 'default';
    site.engine = 'oak';
    site.name = formValue.name;
    return this.siteService.addSite(site);
  }

  addClientSite(): Observable<any> {
    this.loading = true;
    const formValue = this.createSiteForm.value;
    const site = new CreateSiteDto();
    // if scope global, we add the content type for site 0.
    site.id.elementId = 'contact';
    site.id.organizationId = 'default';
    site.engine = 'oak';
    site.name = formValue.name;
    return this.siteService.addSite(site);
  }

  /**
   * Create folder of nodes config:
   */
  addConfigFolder(): Observable<any> {
    const formValue = this.createSiteForm.value;
    const createNode = new CreateNodeDto();
    createNode.nodeType = new NodeTypeIdentifierDto();
    createNode.nodeType.id = new OrgElementSlugDto();
    createNode.nodeType.slug = 'folder';
    createNode.nodeType.id.organizationId = '0';
    createNode.nodeType.id.elementId = '0';

    createNode.name = 'offre-client';
    createNode.nodeSiteSlug = new OrgSiteNodeSlugDto();
    createNode.nodeSiteSlug.organizationId = 'default';
    createNode.nodeSiteSlug.elementId = formValue.slug;
    createNode.nodeSiteSlug.nodeSlug = new NodeSlug('/offre-client');
    return this.siteService.addNode(createNode);
  }

  /**
   * Create a config node:
   */
  addClientConfigNode(): Observable<any> {
    const formValue = this.createSiteForm.value;
    const createNode = new CreateNodeDto();
    createNode.nodeType = new NodeTypeIdentifierDto();
    createNode.nodeType.id = new OrgElementSlugDto();
    createNode.nodeType.slug = 'easybrain_page_info';
    createNode.nodeType.id.organizationId = this.orgId;
    createNode.nodeType.id.elementId = '0';
    createNode.contextId = FappiUtils.uuid();
    createNode.name = 'client';
    createNode.properties = {};
    createNode.nodeSiteSlug = new OrgSiteNodeSlugDto();
    createNode.nodeSiteSlug.organizationId = 'default';
    createNode.nodeSiteSlug.elementId = formValue.slug;
    createNode.nodeSiteSlug.nodeSlug = new NodeSlug('/offre-client/offre');
    return this.siteService.addNode(createNode);
  }


  addClientsFolder(): Observable<any> {
    const formValue = this.createSiteForm.value;
    const createNode = new CreateNodeDto();
    createNode.nodeType = new NodeTypeIdentifierDto();
    createNode.nodeType.id = new OrgElementSlugDto();
    createNode.nodeType.slug = 'folder';
    createNode.nodeType.id.organizationId = '0';
    createNode.nodeType.id.elementId = '0';

    createNode.name = 'clients';
    createNode.nodeSiteSlug = new OrgSiteNodeSlugDto();
    createNode.nodeSiteSlug.organizationId = this.orgId;
    createNode.nodeSiteSlug.elementId = formValue.slug;
    createNode.nodeSiteSlug.nodeSlug = new NodeSlug('/clients');
    return this.siteService.addNode(createNode);
  }

  addLeadFolder(): Observable<any> {
    const formValue = this.createSiteForm.value;
    const createNode = new CreateNodeDto();
    createNode.nodeType = new NodeTypeIdentifierDto();
    createNode.nodeType.id = new OrgElementSlugDto();
    createNode.nodeType.slug = 'leads';
    createNode.nodeType.id.organizationId = '0';
    createNode.nodeType.id.elementId = '0';

    createNode.name = 'clients';
    createNode.nodeSiteSlug = new OrgSiteNodeSlugDto();
    createNode.nodeSiteSlug.organizationId = this.orgId;
    createNode.nodeSiteSlug.elementId = formValue.slug;
    createNode.nodeSiteSlug.nodeSlug = new NodeSlug('/clients/leads');
    return this.siteService.addNode(createNode);
  }


  addOrganization(): Observable<any> {
    const formValue = this.createSiteForm.value;
    const organization = new AddRootOrganizationDto(
      formValue.name,
      formValue.slug,
      true
    );
    return this.organizationService.addRootOrganization(organization).pipe(map((ret) => {
        this.uxMessageService.handleSuccess('Organization added');
        return ret;
      },
      (err) => {
        this.loading = false;
        this.uxMessageService.handleError(err);
      }
    ));
  }


  back() {
    window.history.back();
  }

}
