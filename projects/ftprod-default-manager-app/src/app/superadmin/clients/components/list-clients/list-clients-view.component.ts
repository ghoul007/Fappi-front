import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ClientResource, SuperAdminService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {DeleteClientCommand} from '../../../../../../../fappi-common-model/src/lib/domain/superadmin/dto/DeleteClientCommand';
import {ConfirmDeleteClientCommand} from '../../../../../../../fappi-common-model/src/lib/domain/superadmin/dto/ConfirmDeleteClientCommand';


@Component({
  selector: 'app-clients-view',
  templateUrl: './list-clients-view.component.html',
  styleUrls: ['./list-clients-view.component.scss']
})
export class ListClientsViewComponent {


  @ViewChild(MatPaginator) paginator: MatPaginator;

  processing = false;

  dataSource = new MatTableDataSource<ClientResource>([]);
  displayedColumns: string[] = ['id', 'name', 'domain', 'description', 'status', 'actions'];

  constructor(private router: Router,
              private superAdminService: SuperAdminService,
              private uxMessageService: UXMessageService) {
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.superAdminService.findAll().subscribe((clients) => {
        this.dataSource.data = clients.content;
      },
      (err) => this.uxMessageService.handleError(err)
    );

  }


  onClientSelected(event: ClientResource) {
    this.router.navigate(['superadmin', 'clients', 'edit', event.slug.name]);
  }


  login(elem: ClientResource) {
    window.open(elem.domain, '_blank');
  }

  delete(elem: ClientResource) {
    this.processing = true;
    const deleteClientCommand: DeleteClientCommand = new DeleteClientCommand();
    deleteClientCommand.clientSlug = elem.slug;

    this.superAdminService.delete(deleteClientCommand).subscribe((ret) => {
        this.processing = false;
        this.uxMessageService.handleSuccess('Deleted Successfully');
        setTimeout(() => window.location = window.location, 2000);
      },
      (err) => {
        console.log(err);
        this.processing = false;
        this.uxMessageService.handleError(err);
      }
    );
  }

  confirmDelete(elem: ClientResource) {
    this.processing = true;
    const confirmDeleteClientCommand: ConfirmDeleteClientCommand = new ConfirmDeleteClientCommand();
    confirmDeleteClientCommand.clientSlug = elem.slug;

    this.superAdminService.confirmDelete(confirmDeleteClientCommand).subscribe((ret) => {
        this.processing = false;
        this.uxMessageService.handleSuccess('Deleted permanently Successfully');
        setTimeout(() => window.location = window.location, 2000);
      },
      (err) => {
        console.log(err);
        this.processing = false;
        this.uxMessageService.handleError(err);
      }
    );
  }
}
