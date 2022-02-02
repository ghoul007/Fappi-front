import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {switchMap} from 'rxjs/operators';
import {CustomTypeResource, SiteService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';


/**
 * List all node types
 * FIXME place it into the cms module
 */
@Component({
  selector: 'app-cms-edit-node-types',
  templateUrl: './cms-edit-node-types.component.html',
  styleUrls: ['./cms-edit-node-types.component.scss'],
  providers: []
})// FIXME as CmsListNodeTypeComponent
export class CmsEditNodeComponent implements AfterViewInit {


  dataSource = new MatTableDataSource<CustomTypeResource>([]);
  displayedColumns: string[] = ['slug', 'scope'];

  @Input()
  selectedOrganizationId: string;

  @Input()
  selectedSiteId: string;

  @Output()
  onNodeTypeSelected: EventEmitter<CustomTypeResource> = new EventEmitter();


  nodeType: CustomTypeResource;

  constructor(private fb: FormBuilder, private siteService: SiteService, private uxMessageService: UXMessageService) {

  }

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
    // Find node types and global node types
    this.siteService.findAllNodeTypes(this.selectedOrganizationId, this.selectedSiteId).pipe(
      // FIXME here we call in the second call multiple time (il multiple elements in first query ?)
      switchMap((list, index) => {
        return this.siteService.findNodeTypes(this.selectedOrganizationId, '0');
      })
    ).subscribe((types) => {
        this.dataSource.data = types;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  lineClicked(nodeTypeResource: CustomTypeResource) {
    this.onNodeTypeSelected.emit(nodeTypeResource);
  }

  saveNodeType() {

  }

  cancel() {

  }


}
