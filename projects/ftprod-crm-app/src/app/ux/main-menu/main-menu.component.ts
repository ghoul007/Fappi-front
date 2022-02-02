import {Component, Input} from '@angular/core';
import {Organization, SuperAdminService} from 'fappi-common-model';


@Component({
  selector: 'app-main-menu',
  templateUrl: 'main-menu.component.html',
  styleUrls: ['main-menu.component.scss']
})
export class MainMenuComponent {

  @Input()
  selectedOrg: Organization;
  @Input()
  large = true;

  constructor(private superadminService: SuperAdminService) {
    this.initUx();
  }

  initUx() {
  }

}
