import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {GroupId, GroupService, UserResource, UserService} from 'fappi-common-model';
import {ConfirmDialog, UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  data = {showDeleted: false};

  dataSource = new MatTableDataSource<UserResource>([]);
  displayedColumns: string[] = ['username'];
  @Output()
  onUserSelected: EventEmitter<UserResource> = new EventEmitter();
  @Output()
  onRowDelete: EventEmitter<UserResource> = new EventEmitter();

  constructor(private userService: UserService, private groupService: GroupService, private uxMessageService: UXMessageService,
              public dialog: MatDialog, breakpointObserver: BreakpointObserver) {

    breakpointObserver.observe([
      Breakpoints.Large,
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.matches) {
        // medium
      }
    });
    breakpointObserver.observe([
      Breakpoints.Medium,
      Breakpoints.Large
    ]).subscribe(result => {
      if (result.matches) {
        // large
      }
    });
  }

  private _rowActions: string[];

  get rowActions(): string[] {
    return this._rowActions;
  }

  @Input()
  set rowActions(rowActions: string[]) {
    this._rowActions = rowActions;
    if (rowActions.length > 0) {
      this.displayedColumns.push('actions');
    } else {
      const index = this.displayedColumns.indexOf('actions', 0);
      if (index > -1) {
        this.displayedColumns.splice(index, 1);
      }
    }
  }

  private _selectedOrganizationId: string;

  get selectedOrganizationId(): string {
    return this._selectedOrganizationId;
  }

  @Input()
  set selectedOrganizationId(selectedOrganizationId: string) {
    this._selectedOrganizationId = selectedOrganizationId;
    this.search();
  }

  private _selectedGroupId: GroupId;

  get selectedGroupId(): GroupId {
    return this._selectedGroupId;
  }

  @Input()
  set selectedGroupId(selectedGroupId: GroupId) {
    if (selectedGroupId) {
      this._selectedGroupId = selectedGroupId;
      this._selectedOrganizationId = selectedGroupId.organizationId;
      this.search();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  search() {
    if (this.selectedGroupId) {
      this.searchByGroup();
    } else {
      this.searchByOrg();
    }
  }

  searchByOrg() {
    if (this.selectedOrganizationId ) {
      this.userService.findAllByOrganization(this.selectedOrganizationId, this.data.showDeleted).subscribe((users) => {
          this.dataSource.data = users;
        },
        (err) => this.uxMessageService.handleError(err)
      );
    } else {
      this.userService.findAll(this.data.showDeleted).subscribe((users) => {
          this.dataSource.data = users;
        },
        (err) => this.uxMessageService.handleError(err)
      );
    }
  }

  searchByGroup() {
    if (this._selectedGroupId != null) {
      this.groupService.findMembers(this.selectedOrganizationId, this.selectedGroupId.id).subscribe((users) => {
          this.dataSource.data = users;
        },
        (err) => this.uxMessageService.handleError(err)
      );

    }
  }

  lineClicked(user: UserResource) {
    this.onUserSelected.emit(user);

  }

  removeMember(user: UserResource) {
    const dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onRowDelete.emit(user);
      }
    });
  }

}
