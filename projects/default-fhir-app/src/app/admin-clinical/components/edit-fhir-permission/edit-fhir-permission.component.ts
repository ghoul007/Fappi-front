import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {
  FappiPermissionResource,
  GroupResource,
  GroupService,
  NodeSlug,
  OrgSiteNodeSlugDto,
  SetNodePermissionDto,
  SiteService
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {combineLatest, forkJoin, Observable, zip} from "rxjs";


@Component({
  selector: 'app-edit-fhir-permission',
  templateUrl: './edit-fhir-permission.component.html',
  styleUrls: ['./edit-fhir-permission.component.scss'],
  providers: []
})
export class EditFhirPermissionComponent implements OnInit {

  @Input()
  selectedOrganizationId: string;

  @Input()
  selectedSiteId: string;

  @Input()
  path: string;

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter<void>();

  processing = false;

  groups: GroupResource[];
  // TODO pass scopes as parameters and get its from the server
  scopes = [
    {id: 'fhir.patient.read', name: 'Read Patients'}, {id: 'fhir.patient.write', name: 'Write Patients'},
    {id: 'fhir.episode.read', name: 'Read Episodes'}, {id: 'fhir.episode.write', name: 'Write Episodes'},
    {id: 'fhir.organization.read', name: 'Read Organizations'}, {id: 'fhir.organization.write', name: 'Write Organizations'},
    {id: 'fhir.practitioner.read', name: 'Read Practitioners'}, {id: 'fhir.practitioner.write', name: 'Write Practitioners'},
    {id: 'fhir.manage', name: 'Manage'}];
  permissions: FappiPermissionResource [];
  model: any[][] = [];


  // TODO make it generic so greate a generic service or return an object (eventemitter.emit)
  constructor(private fb: FormBuilder, private siteService: SiteService, private groupService: GroupService,
              private uxMessageService: UXMessageService) {
  }

  ngOnInit() {

    this.groupService.findAllByOrganization(this.selectedOrganizationId).subscribe((groups) => {
        this.groups = groups;

        // We build matrix
        for (const group of groups) {
          this.model[group.groupId.id] = [];
          for (const scope of this.scopes) {
            this.model[group.groupId.id][scope.id] = false;
          }
        }

        // now we get right
        this.siteService.findNodeRights(this.selectedOrganizationId, this.selectedSiteId, this.path).subscribe((permissions) => {
            this.permissions = permissions;
            // and  then we patch matrix with values
            for (const perm of this.permissions) {
              for (const group of perm.groupIds) {
                for (const scopeTrue of perm.scopes) {
                  this.model[group.id][scopeTrue] = true;
                }
              }
            }
          },
          (err) => this.uxMessageService.handleError(err)
        );
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  saveSecurityMatrix() {
    this.processing = true;
    const setNodeCalls = [];
    for (const group of this.groups) {
      const dto = new SetNodePermissionDto();
      dto.nodeSiteSlug = new OrgSiteNodeSlugDto(this.selectedOrganizationId, this.selectedSiteId, new NodeSlug(this.path));
      dto.groupIds = [group.groupId];
      dto.scopes = [];
      for (const scope of this.scopes) {

        if (this.model[group.groupId.id][scope.id]) {
          dto.scopes.push(scope.id);
        }
      }
      setNodeCalls.push(this.siteService.setNodePermission(dto));
    }

    forkJoin(setNodeCalls).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Permissions added');
        this.cancel();
        this.processing = false;
      },
      (err) => {
        this.processing = false;
        this.uxMessageService.handleError(err);
      }
    );
  }


  cancel() {
    this.onCancel.emit();
  }


}
