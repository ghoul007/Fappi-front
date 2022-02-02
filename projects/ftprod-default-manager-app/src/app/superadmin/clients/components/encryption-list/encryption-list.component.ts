import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {Data, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {
  ClientResource,
  ClientSlug,
  CryptoConfig,
  SetDefaultCryptoConfigDto,
  SuperAdminService
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';

@Component({
  selector: 'app-encryption-list',
  templateUrl: './encryption-list.component.html',
  styleUrls: ['./encryption-list.component.scss']
})
export class EncryptionListComponent implements AfterViewInit {

  @Input()
  clientId: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<CryptoConfig>([]);
  displayedColumns: string[] = ['id', 'algorithm', 'default', 'actions'];

  defaultConfig: string;

  constructor(private router: Router, private superAdminService: SuperAdminService, private uxMessageService: UXMessageService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.superAdminService.findCryptoConfigs(this.clientId).subscribe((cryptoConfigs) => {
        this.defaultConfig = cryptoConfigs.preferredCryptoConfig;
        const data = [];
        Object.keys(cryptoConfigs.configs).forEach(key => {
          data.push(cryptoConfigs.configs[key]);
        });
        this.dataSource.data = data;
      },
      (err) => this.uxMessageService.handleError(err)
    );

  }

  setDefault(elem: CryptoConfig) {
    const dto: SetDefaultCryptoConfigDto = new SetDefaultCryptoConfigDto();
    dto.id = elem.id;
    dto.clientSlug = new ClientSlug();
    dto.clientSlug.name = this.clientId;
    this.superAdminService.setDefaultCryptoConfig(dto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Config set.');
    },
      (err) => this.uxMessageService.handleError(err));
  }
}
