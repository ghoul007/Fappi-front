import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {GroupResource, GroupService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.scss']
})
export class ListGroupsComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  _selectedOrganizationId: string;

  dataSource = new MatTableDataSource<GroupResource>([]);
  displayedColumns: string[] = ['name'];

  get selectedOrganizationId() {
    return this._selectedOrganizationId;
  }
  @Input()
  set selectedOrganizationId(selectedOrganizationId: string) {
    this._selectedOrganizationId = selectedOrganizationId;
    this.searchGroups();
  }

  @Output()
  onGroupSelected: EventEmitter<GroupResource> = new EventEmitter();

  constructor(private groupService: GroupService, private uxMessageService: UXMessageService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  searchGroups() {
    this.dataSource.data = [];
    this.groupService.findAllByOrganization(this.selectedOrganizationId).subscribe((groups) => {
        this.dataSource.data = groups;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  lineClicked(group: GroupResource) {
    this.onGroupSelected.emit(group);

  }

}
