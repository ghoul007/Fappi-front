import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {CmsNodeSelectorComponent, CmsNodeSelectorData} from '../cms-node-selector/cms-node-selector.component';
import {CustomTypeResource, MoveNodeDto, NodeResource, SiteService, UserInfoService} from 'fappi-common-model';
import {ConfirmDialog, UXMessageService} from 'fappi-ng-material-kit';
import {UpdateWatcher} from '../service/UpdateWatcher';
import {FileChooserComponent} from 'fappi-ng-media';
import {DynamicDataSource} from '../cms-tree/DynamicDataSource';


@Component({
  selector: 'app-cms-edit-node-v2',
  templateUrl: './cms-edit-node-v2.component.html',
  styleUrls: ['./cms-edit-node-v2.component.scss'],
  providers: []
})
export class CmsEditNodeTypesV2Component {

  @Input()
  selectedOrganizationId: string;

  localSelectedSiteId: string;

  loading = false;

  @Output()
  nodeSaved: EventEmitter<NodeResource> = new EventEmitter<NodeResource>();

  @Output()
  nodeDeleted: EventEmitter<NodeResource> = new EventEmitter<NodeResource>();

  operations: Set<string> = new Set<string>();
  dataSource: DynamicDataSource;
  @Output()
  nodeEditStart: EventEmitter<NodeResource> = new EventEmitter<NodeResource>();
  @Output()
  nodeEditEnd: EventEmitter<NodeResource> = new EventEmitter<NodeResource>();
  editTitle = false;
  editNodeForm: FormGroup;
  editing = false;
  childNodes: NodeResource[] = [];
  nodeType: CustomTypeResource;
  rteModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{list: 'ordered'}, {list: 'bullet'}],
      [{script: 'sub'}, {script: 'super'}],
      ['clean']
    ]
  };

  constructor(protected fb: FormBuilder, protected siteService: SiteService, protected uxMessageService: UXMessageService,
              protected dialog: MatDialog, protected updateWatcher: UpdateWatcher, protected userInfoService: UserInfoService) {
    updateWatcher.update.subscribe((m) => {
      const nodePublicId = '/' + this.selectedNode.id.organizationId + '/' +
        this.selectedNode.id.elementId + this.selectedNode.id.nodeSlug.slug;
      if (nodePublicId === m.elementId) {
        if (m.kind === 'UpdatedNodeContentEvent') {
          this.savedCommit(m.contextId);
        } else if (m.kind === 'SetNodeMetaEvent') {
          this.savedMetaCommit(m.contextId);
        }
      }
    });
  }

  get selectedSiteId(): string {
    return this.localSelectedSiteId;
  }

  @Input()
  set selectedSiteId(s: string) {
    this.localSelectedSiteId = s;
  }

  protected _selectedNode: NodeResource;

  get selectedNode(): NodeResource {
    return this._selectedNode;
  }

  @Input()
  set selectedNode(node: NodeResource) {
    this._selectedNode = node;
    this.editNode();
  }

  refresh() {
    // refresh because it is saved:
    this.siteService.findOneNode(this.selectedNode.id.organizationId, this.selectedNode.id.elementId, this.selectedNode.id.nodeSlug.slug)
      .subscribe((n) => {
        this.selectedNode = n;
      });
  }

  editNode() {
    this.nodeType = null;
    if (this._selectedNode) {
      if (this._selectedNode.nodeType.slug === 'folder') {

        this.nodeType = null;
        this.editNodeForm = this.fb.group({
          _$$name: [this._selectedNode.name, Validators.required]
        });
        this.siteService.findNodes(this.selectedOrganizationId, this.selectedSiteId, this.selectedNode.id.nodeSlug.slug,
          true).subscribe((nodes) => {
            this.childNodes = nodes;
          },
          (err) => this.uxMessageService.handleError(err)
        );
      } else {
        const nodeTypeId = this._selectedNode.nodeType;
        this.siteService.findOneNodeType(this.selectedOrganizationId, nodeTypeId).subscribe((nodetype) => {
            this.nodeType = nodetype;
            const nodeTypes = this.nodeType.customTypeFields.sort((nt1, nt2) => nt1.order - nt2.order);
            this.editNodeForm = this.fb.group({
              _$$name: [this._selectedNode.name, Validators.required]
            });

            const propertiesCopy = Object.assign({}, this._selectedNode.properties);
            for (const field of nodeTypes) {
              const control: FormControl = new FormControl(''/*default or old*/, Validators.required);
              this.editNodeForm.addControl(field.slug, control);

              // transform value with type if type not string:
              if (field.type === 'BOOLEAN') {
                if (propertiesCopy[field.slug]) {
                  propertiesCopy[field.slug] = propertiesCopy[field.slug] === 'true';
                }
              }
            }

            this.editNodeForm.patchValue(propertiesCopy);
            this.editNodeForm.disable();

          },
          (err) => this.uxMessageService.handleError(err)
        );
      }
    }
  }

  cancel() {
    this.editing = false;
    this.editNodeForm.disable();
    this.nodeEditEnd.emit(this._selectedNode);
    this.editTitle = false;
  }


  saveNode() {
    this.loading = true;
    const formValue = this.editNodeForm.value;
    this.siteService.updateNode(this.selectedOrganizationId, this.selectedSiteId,
      this._selectedNode.id.nodeSlug.slug, formValue, formValue._$$name).subscribe((n) => {
        this.refresh();
        this.uxMessageService.handleSuccess('Node saved');
        this.loading = false;
      },
      (err) => {
        this.uxMessageService.handleError(err);
        this.loading = false;
      }
    );

    this.editTitle = false;
    this.editing = false;
    this.editNodeForm.disable();
    this.nodeEditEnd.emit(this._selectedNode);

  }

  saveNodeName() {

  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.siteService.deleteNode(this.selectedOrganizationId, this.selectedSiteId,
          this._selectedNode.id.nodeSlug.slug).subscribe((n) => {
            this.uxMessageService.handleSuccess('Deleted');
            this.nodeDeleted.emit(this.selectedNode);
          },
          (err) => this.uxMessageService.handleError(err)
        );
      }
    });
  }

  edit() {
    this.editing = true;
    this.editNodeForm.enable();
    this.nodeEditStart.emit(this._selectedNode);
  }

  startEditTitle() {
    this.editTitle = true;
    this.edit();
  }

  selectNode() {
    const cmsNodeSelectorData: CmsNodeSelectorData = new CmsNodeSelectorData();
    cmsNodeSelectorData.selectedSiteId = this.selectedSiteId;
    cmsNodeSelectorData.selectedOrganizationId = this.selectedOrganizationId;
    cmsNodeSelectorData.title = 'Select the node where to move your node';
    cmsNodeSelectorData.onlyFolder = true;
    const dialogRef = this.dialog.open(CmsNodeSelectorComponent, {data: cmsNodeSelectorData, width: '550px'});
    dialogRef.afterClosed().subscribe(r => {
      if (r) {
        const result = r as CmsNodeSelectorData;
        const moveNodeDto = new MoveNodeDto();
        moveNodeDto.sourcePath = this.selectedNode.id;
        moveNodeDto.destPath = result.selectedNode.id;
        this.siteService.moveNode(moveNodeDto).subscribe((ret) => {
          this.uxMessageService.handleSuccess('Moved');
        });
      }
    });
  }


  onSubNodeEditStart(node: NodeResource) {
    this.nodeEditStart.emit(node);
  }

  onSubNodeEditEnd(node: NodeResource) {
    this.nodeEditEnd.emit(node);
  }

  /**
   * After a node save
   *
   * @param contextId the id of the  operation
   */
  savedCommit(contextId: string) {
    setTimeout(() => {
      this.refresh();
      this.nodeSaved.emit(this._selectedNode);
    }, 100);
    // the operation is on the current node:
    if (this.operations.has(contextId)) {
      this.operations.delete(contextId);
      this.uxMessageService.handleSuccess('Saved');
      this.loading = false;
    }
  }

  chooseFile(fieldSlug: string) {
    const dialogRef = this.dialog.open(FileChooserComponent, {
      width: '650px', data: {orgId: this.selectedOrganizationId}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.editNodeForm.controls[fieldSlug].patchValue(result.media.id + '|' + result.media.path);
    });
  }

  openFile(slug: string) {
    // the storage format is 'id|path'
    if (this.editNodeForm.controls[slug].value.indexOf('|') > 0) {
      const id = this.editNodeForm.controls[slug].value.split('|')[0];
      window.open(`/media/${this.selectedOrganizationId}/` +
        `files/${id}`, '_blank');
    }
  }

  /**
   * When the meta of the node is updated
   * @param contextId the id of the  operation
   */
  savedMetaCommit(contextId: string) {
    // for override
  }
}

