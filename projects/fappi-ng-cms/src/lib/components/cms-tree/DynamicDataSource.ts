import {EventEmitter} from '@angular/core';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {DynamicFlatNode} from './DynamicFlatNode';
import {FlatTreeControl} from '@angular/cdk/tree';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {map} from 'rxjs/operators';
import {SiteService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

export class NodeKeeper {
  constructor(public slug: string, public expanded: boolean) {
  }
}


export class DynamicDataSource {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);
  connected: EventEmitter<void> = new EventEmitter<void>();
  /**
   * A function to filter node to display
   */
  filter: any;
  private openedFolders: Map<string, NodeKeeper> = new Map<string, NodeKeeper>();

  constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>,
              private siteService: SiteService,
              private orgId: string, private siteId: string,
              private uxMessageService: UXMessageService) {
  }

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }

  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });
    this.connected.emit();
    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  async handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      for (const node of change.added) {
        await this.toggleNode(node, true);
      }
    }
    if (change.removed) {
      for (const node of change.removed) {
        await this.toggleNode(node, false);
      }
    }
  }


  async refresh() {
    this._treeControl.collapse(this.data[0]);
    this._treeControl.expand(this.data[0]);
  }

  toggleNode(node: DynamicFlatNode, expand: boolean) {
    return new Promise((resolve) => {
      this.openedFolders.set(node.nodeResource.id.nodeSlug.slug, new NodeKeeper(node.nodeResource.id.nodeSlug.slug, expand));
      let index = this.data.indexOf(node);
      if (index < 0) {
        return;
      }
      node.isLoading = true;

      if (!expand) {
        let count = 0;
        for (let i = index + 1; i < this.data.length && this.data[i].level > node.level; i++, count++) {
        }
        this.data.splice(index + 1, count);
        this.dataChange.next(this.data);
        node.isLoading = false;
        resolve();
      } else {
        this.siteService.findNodes(this.orgId, this.siteId, node.nodeResource.id.nodeSlug.slug).subscribe((children) => {
            // filter nodes:
            //children = children.filter((n) => this.filter(n.id.nodeSlug.slug));
            children = children.filter((n) => this.filter(n));

            index = this.data.indexOf(node);
            const nodes = children.map(cmsNode => new DynamicFlatNode(cmsNode, node.level + 1));
            this.data.splice(index + 1, 0, ...nodes);
            // notify the change
            this.dataChange.next(this.data);
            node.isLoading = false;


            // if was openned, reopen
            for (const childNode of nodes) {
              const nodeKeeper: NodeKeeper = this.openedFolders.get(childNode.nodeResource.id.nodeSlug.slug);
              if (nodeKeeper && nodeKeeper.expanded) {
                this._treeControl.expand(childNode);
              }
            }

            resolve();
          },
          (err) => {
            node.isLoading = false;
            resolve();
            this.uxMessageService.handleError(err);
          }
        );
      }

    });
  }


}
