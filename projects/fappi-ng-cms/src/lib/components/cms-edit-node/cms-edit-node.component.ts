import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {CmsNodeSelectorComponent, CmsNodeSelectorData} from '../cms-node-selector/cms-node-selector.component';
import {
  ChannelResource,
  CustomTypeResource, MoveDownNodeDto,
  MoveNodeDto, MoveUpNodeDto,
  NodeResource,
  NodeVersionResource, OrgSiteNodeSlugDto, ReorderNodeDto,
  SiteService,
  UserInfoService
} from 'fappi-common-model';
import {ConfirmDialog, UXMessageService} from 'fappi-ng-material-kit';
import {UpdateWatcher} from '../service/UpdateWatcher';
import {FileChooserComponent} from 'fappi-ng-media';
import {DynamicFlatNode} from '../cms-tree/DynamicFlatNode';
import diff from 'simple-text-diff';
import {zipAll} from 'rxjs/operators';
import {combineLatest, zip} from 'rxjs';
import {diffString} from './jsdiff';


@Component({
  selector: 'app-cms-edit-node',
  templateUrl: './cms-edit-node.component.html',
  styleUrls: ['./cms-edit-node.component.scss'],
  providers: []
})
// FIXME rename !
export class CmsEditNodeTypesComponent implements AfterViewInit, OnChanges {

  loading = false;


  /**
   * Show the edit menu
   */
  @Input()
  standAlone = false;

  @Output()
  nodeSaved: EventEmitter<NodeResource> = new EventEmitter<NodeResource>();

  @Output()
  nodeDeleted: EventEmitter<NodeResource> = new EventEmitter<NodeResource>();

  operations: Set<string> = new Set<string>();
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

  protected _selectedNode: NodeResource;

  protected _selectedChannel: ChannelResource;

  protected _selectedVersion: NodeVersionResource;

  public oldVersionMode: boolean = false;

  // FIXME hardcoded filter function:
  @Input()
  filterFunction = (path) => path !== '/private'



  constructor(protected fb: FormBuilder, protected siteService: SiteService, protected uxMessageService: UXMessageService,
              protected dialog: MatDialog, protected updateWatcher: UpdateWatcher, protected userInfoService: UserInfoService) {

  }


  ngOnChanges(changes: SimpleChanges): void {
    this.editNode();
  }


  get selectedNode(): NodeResource {
    return this._selectedNode;
  }

  @Input()
  set selectedNode(node: NodeResource) {
    this._selectedNode = node;
  }

  get selectedChannel() {
    return this._selectedChannel;
  }

  @Input()
  set selectedChannel(selectedChannel: ChannelResource) {
    this._selectedChannel = selectedChannel;
  }

  get selectedVersion() {
    return this._selectedVersion;
  }

  @Input()
  set selectedVersion(selectedVersion: NodeVersionResource) {
    if (selectedVersion?.label) {
      this.oldVersionMode = true;
    } else {
      this.oldVersionMode = false;
    }
    this._selectedVersion = selectedVersion;
  }



  ngAfterViewInit(): void {

  }

  refresh() {   // refresh because it is saved:
    this.siteService.findOneNode(this.selectedNode.id.organizationId, this.selectedNode.id.elementId, this.selectedNode.id.nodeSlug.slug,
      this.selectedChannel?.id)
      .subscribe((n) => {
        this.selectedNode = n;
      });
  }

// TODO rename as init form
  editNode() {
    this.nodeType = null;
    if (this._selectedNode) {
      if (this._selectedNode.nodeType.slug === 'folder') {

        this.nodeType = null;
        this.editNodeForm = this.fb.group({
          _$$name: [this._selectedNode.name, Validators.required]
        });

        this.siteService.findNodes(this.selectedNode.id.organizationId, this.selectedNode.id.elementId, this.selectedNode.id.nodeSlug.slug,
          true, this.selectedChannel?.id, this.selectedVersion?.label).subscribe((nodes) => {
            this.childNodes = [];
            for (const node of nodes ) {
              if (this.filterFunction(node.id.nodeSlug.slug)) {
                this.childNodes.push(node);
              }
            }
          },
          (err) => this.uxMessageService.handleError(err)
        );
      } else {
        const nodeTypeId = this._selectedNode.nodeType;
        this.siteService.findOneNodeType(this.selectedNode.id.organizationId, nodeTypeId).subscribe((nodetype) => {
            this.nodeType = nodetype;
            const nodeTypes = this.nodeType.customTypeFields.sort((nt1, nt2) => nt1.order - nt2.order);
            this.editNodeForm = this.fb.group({
              _$$name: [this._selectedNode.name, Validators.required]
            });
            for (const field of nodeTypes) {
              const control: FormControl = new FormControl(''/*default or old*/, Validators.required);
              this.editNodeForm.addControl(field.slug, control);
            }

            const findNode = this.siteService.findOneNode(this._selectedNode.id.organizationId,
              this._selectedNode.id.elementId,
              this._selectedNode.id.nodeSlug.slug, this.selectedChannel?.id,
              this.selectedVersion?.label
              );
            const findLatestNodeVersion = this.oldVersionMode ?  this.siteService.findOneNode(this._selectedNode.id.organizationId,
              this._selectedNode.id.elementId,
              this._selectedNode.id.nodeSlug.slug, this.selectedChannel?.id,
              undefined
            ) : findNode;

            combineLatest([findNode, findLatestNodeVersion]).subscribe((nodesVersions) => {
              this._selectedNode = nodesVersions[0];
              const propertiesCopy = Object.assign({}, this._selectedNode.properties);
              for (const field of nodeTypes) {
                // for string, we add a diff if we are in old version mode:
                if ( this.oldVersionMode && (field.type === 'TEXT' ||  field.type === 'STRING')) {
                  propertiesCopy[field.slug] = diffString(
                    nodesVersions[0].properties[field.slug].replace(/<\/?[^>]+(>|$)/g, ''),
                    nodesVersions[1].properties[field.slug].replace(/<\/?[^>]+(>|$)/g, '')
                    );
                }
                // transform value with type if type not string:
                if (field.type === 'BOOLEAN') {
                  if (propertiesCopy[field.slug]) {
                    propertiesCopy[field.slug] = propertiesCopy[field.slug] === 'true';
                  }
                }
              }
              this.editNodeForm.patchValue(propertiesCopy);
              if ( !this.standAlone ) {
                this.editNodeForm.disable();
              }

            });
          },
          (err) => this.uxMessageService.handleError(err)
        );
      }
    }
  }

  cancel() {
    this.editing = false;
    if ( !this.standAlone ) {
      this.editNodeForm.disable();
    }
    this.nodeEditEnd.emit(this._selectedNode);
    this.editTitle = false;
  }


  saveNode() {
    this.loading = true;
    const formValue = this.editNodeForm.value;
    this.siteService.updateNode(this.selectedNode.id.organizationId, this.selectedNode.id.elementId,
      this._selectedNode.id.nodeSlug.slug, formValue, formValue._$$name, this.selectedChannel?.id).subscribe((n) => {
        this.refresh();
        this.nodeSaved.emit(this.selectedNode);
        this.loading = false;
      },
      (err) => {
        this.uxMessageService.handleError(err);
        this.loading = false;
      }
    );

    this.editTitle = false;
    this.editing = false;
    if ( !this.standAlone ) {
      this.editNodeForm.disable();
    }
    this.nodeEditEnd.emit(this._selectedNode);

  }

  saveNodeName() {

  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.siteService.deleteNode(this.selectedNode.id.organizationId, this.selectedNode.id.elementId,
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
    cmsNodeSelectorData.selectedSiteId = this.selectedNode.id.elementId;
    cmsNodeSelectorData.selectedOrganizationId = this.selectedNode.id.organizationId;
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

  moveUp() {
    const reorderNodeDto = new MoveUpNodeDto();
    const nodeToMove = new OrgSiteNodeSlugDto();
    nodeToMove.elementId = this._selectedNode.id.elementId;
    nodeToMove.organizationId = this._selectedNode.id.organizationId;
    nodeToMove.nodeSlug.slug = this._selectedNode.id.nodeSlug.slug;
    reorderNodeDto.sourcePath = nodeToMove;
    this.loading = true;
    this.siteService.moveUp(reorderNodeDto).subscribe((ret) => {
      this.refresh();
      this.loading = false;
    }, ( err ) => {
      this.uxMessageService.handleError('Error moving the node');
      this.loading = false;
    });
  }

  moveDown() {
    const reorderNodeDto = new MoveDownNodeDto();
    const nodeToMove = new OrgSiteNodeSlugDto();
    nodeToMove.elementId = this._selectedNode.id.elementId;
    nodeToMove.organizationId = this._selectedNode.id.organizationId;
    nodeToMove.nodeSlug.slug = this._selectedNode.id.nodeSlug.slug;
    reorderNodeDto.sourcePath = nodeToMove;
    this.loading = true;
    this.siteService.moveDown(reorderNodeDto).subscribe((ret) => {
      this.refresh();
      this.loading = false;
    }, ( err ) => {
          this.uxMessageService.handleError('Error moving the node');
          this.loading = false;
        });
  }


  onSubNodeEditStart(node: NodeResource) {
    this.nodeEditStart.emit(node);
  }

  onSubNodeEditEnd(node: NodeResource) {
    this.nodeEditEnd.emit(node);
  }

  chooseFile(fieldSlug: string) {
    const dialogRef = this.dialog.open(FileChooserComponent, {
      width: '650px', data: {orgId: this.selectedNode.id.organizationId}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.editNodeForm.controls[fieldSlug].patchValue(result.media.id + '|' + result.media.path);
    });
  }

  openFile(slug: string) {
    // the storage format is 'id|path'
    if (this.editNodeForm.controls[slug].value.indexOf('|') > 0) {
      const id = this.editNodeForm.controls[slug].value.split('|')[0];
      window.open(`/media/${this.selectedNode.id.organizationId}/` +
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

