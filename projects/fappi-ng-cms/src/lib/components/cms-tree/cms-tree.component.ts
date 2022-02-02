import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatTree} from '@angular/material/tree';
import {GenericNode} from './generic-node';
import {DynamicFlatNode} from './DynamicFlatNode';
import {FlatTreeControl} from '@angular/cdk/tree';
import {DynamicDataSource} from './DynamicDataSource';
import {MatDialog} from '@angular/material/dialog';
import {CreateNodeComponent} from './dialogs/create-node.component';
import {
  CreateNodeDto,
  NodeResource,
  NodeTypeIdentifierDto,
  OrgElementSlugDto,
  OrgSiteNodeSlugDto,
  ReorderNodeDto,
  SiteService
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {UpdateWatcher} from '../service/UpdateWatcher';

@Component({
  selector: 'app-cms-tree',
  templateUrl: './cms-tree.component.html',
  styleUrls: ['./cms-tree.component.scss'],
  providers: []
})
export class CmsTreeComponent implements AfterViewInit {

  loading = false;

  @ViewChild(MatTree) tree: MatTree<GenericNode>;

  @Input()
  rootNodeName;

  @Input()
  selectedOrganizationId: string;

  @Input()
  selectedSiteId: string;

  /**
   * Show controls on tree
   */
  @Input()
  viewControls = true;

  /**
   * Show only folders in the tree
   */
  @Input()
  viewOnlyFolders = false;


  @Input()
  filterFunction = (path) => true

  @Input()
  nodeSlugGenerator = (slug) => slug

  @Output()
  onNodeSelected: EventEmitter<NodeResource> = new EventEmitter();
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;

  initialized = {init: false};

  constructor(private siteService: SiteService, public dialog: MatDialog, private uxMessageService: UXMessageService,
              private updateWatcher: UpdateWatcher) {
  }

  ngAfterViewInit() {
    const nodeResource = new NodeResource();
    nodeResource.folder = true;
    nodeResource.name = this.rootNodeName ? this.rootNodeName : 'Contenu';
    nodeResource.id = new OrgSiteNodeSlugDto();
    nodeResource.id.organizationId = this.selectedOrganizationId;
    nodeResource.id.elementId = this.selectedSiteId;
    nodeResource.id.nodeSlug.slug = '/';
    nodeResource.nodeType = new NodeTypeIdentifierDto();
    nodeResource.nodeType.slug = 'folder';
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this.siteService, this.selectedOrganizationId,
      this.selectedSiteId, this.uxMessageService);
    this.dataSource.filter = (n) => {
      const show = this.filterFunction (n);
      if (this.viewOnlyFolders) {
        return show && n.folder;
      }
      return show && true;
    };

    const rootNode = new DynamicFlatNode(nodeResource, 1);
    this.dataSource.data = [rootNode];

    const tc = this.treeControl;

    // we have to toogle the tree control and the datasource (bug of treecontrol ?)
    this.dataSource.connected.subscribe(() => {
      this.treeControl.expand(rootNode);
    });

    // refresh aware:
    this.updateWatcher.update.subscribe((m) => {
      const currentFolder = '/' + this.selectedOrganizationId + '/' + this.selectedSiteId + '/';
      if (m.elementId.startsWith(currentFolder)) {
        if (m.kind === 'ReorderNodeEvent') {
        } else if (m.kind === 'MoveNodeEvent') {
        } else if (m.kind === 'DeleteNodeEvent') {
        } else if (m.kind === 'CreateNodeEvent') {
        } else if (m.kind === 'UpdateNodeEvent') {
        }
        setTimeout(() => this.refresh(), 200);
      }
    });

    this.initialized.init = true;

  }


  nodeSelected(node: DynamicFlatNode) {
    this.onNodeSelected.emit(node.nodeResource);
  }

  addNewItem(node: DynamicFlatNode) {
    const dialogRef = this.dialog.open(CreateNodeComponent, {
      width: '450px',
      data: {
        parentNode: node,
        name: '',
        slug: '',
        file: true,
        nodeType: new NodeTypeIdentifierDto(),
        orgId: this.selectedOrganizationId,
        siteId: this.selectedSiteId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let parentNode = result.parentNode.nodeResource.id.nodeSlug.slug;
      if (parentNode === '/') {
        // the root is the only node that ends with / so remove the /
        parentNode = '';
      }
      const slug = parentNode + '/' + this.nodeSlugGenerator(result.slug);

      const createNodeDto = new CreateNodeDto();

      createNodeDto.name = result.name;
      if (result.file) {
        createNodeDto.nodeType = result.nodeType;
      } else {
        const folderNt = new NodeTypeIdentifierDto();
        folderNt.slug = 'folder';
        folderNt.id = new OrgElementSlugDto();
        folderNt.id.organizationId = '0';
        folderNt.id.elementId = '0';
        createNodeDto.nodeType = folderNt;
      }
      createNodeDto.nodeSiteSlug.organizationId = this.selectedOrganizationId;
      createNodeDto.nodeSiteSlug.elementId = this.selectedSiteId;
      createNodeDto.nodeSiteSlug.nodeSlug.slug = slug;

      this.loading = true;

      this.siteService.addNode(createNodeDto).subscribe((ret) => {
          this.uxMessageService.handleSuccess('Created');
        },
        (err) => this.uxMessageService.handleError(err)
      );
    });
  }

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.nodeResource.folder;

  hasChild = (_: number, nodeData: DynamicFlatNode) => nodeData.nodeResource.folder;


  refresh() {
    this.dataSource.refresh();
    this.loading = false;
  }

}
