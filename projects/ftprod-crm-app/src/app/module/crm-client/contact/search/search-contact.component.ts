import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSidenav} from '@angular/material/sidenav';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactResource} from '../../domain/model/ContactResource';
import {ContactService} from '../../domain/services/ContactService';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-search-contact-view',
  templateUrl: './search-contact.component.html',
  styleUrls: ['./search-contact.component.scss']
})
export class SearchContactComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSidenav) sideNav: MatSidenav;

  orgId: string;

  dataSource = new MatTableDataSource<ContactResource>([]);
  defaultCols = ['badge', 'name', 'email', 'title', 'tags', 'actions'];
  smallCols = ['badge', 'name'];
  displayedColumns: string[] = this.defaultCols;
  editing: boolean = false;
  selectedContact: ContactResource;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute, private uxMessageService: UXMessageService) {

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.orgId = this.route.parent.parent.parent.parent.snapshot.params.orgId;
    this.contactService.findAll(this.orgId).subscribe((contactPage) => {
        this.dataSource.data = contactPage.content;
      },
      (err) => this.uxMessageService.handleError(err)
    );
    this.route.params.subscribe((p) => {
      if (p.contactId) {
        this.contactService.findOne(this.orgId, p.contactId).subscribe((r) => {
            this.selectedContact = r;
            this.edit();
          },
          (err) => this.uxMessageService.handleError(err)
        );
      }
    });
  }

  edit() {
    if (!this.sideNav.opened) {
      this.sideNav.toggle();
      this.displayedColumns = this.smallCols;
      this.editing = true;
    }
  }

  add() {
    if (!this.sideNav.opened) {
      this.sideNav.toggle();
      this.displayedColumns = this.smallCols;
      this.editing = true;
      this.selectedContact = null;
    }
  }

  close() {
    if (this.sideNav.opened) {
      this.sideNav.toggle();
      this.displayedColumns = this.defaultCols;
      this.editing = false;
      this.router.navigate(['org', this.orgId, 'crm', 'contact']);
    }
  }


}
