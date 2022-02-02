import {Component, Input} from '@angular/core';
import {Organization, SiteService, SubscriptionStatus, SuperAdminService} from 'fappi-common-model';
import {MatDialog} from '@angular/material/dialog';
import {ShowConnectionInformationsDialog} from './dialog/show-connection-informations.dialog';


@Component({
  selector: 'app-main-menu',
  templateUrl: 'main-menu.component.html',
  styleUrls: ['main-menu.component.scss']
})
export class MainMenuComponent {

  _selectedOrg: Organization;
  @Input()
  large = true;

  crmActivated: boolean;
  cmsActivated: boolean;

  token = '';

  @Input()
  set selectedOrg(org: Organization) {
    this._selectedOrg = org;
    this.initUx();
  }
  get selectedOrg(){
    return this._selectedOrg;
  }


  constructor(private superadminService: SuperAdminService, private dialog: MatDialog, private siteService: SiteService) {
    this.initUx();
  }

  initUx() {
    if (this.selectedOrg) {
      this.siteService.findOneNode('default', this.selectedOrg.id.id, '/offre-client/offre').subscribe((nodeRoot) => {
        this.token = nodeRoot.properties.security_token;
      });
    }
  }

  showConnectionsInformation() {
    const dialogRef = this.dialog.open(ShowConnectionInformationsDialog, {
      data: {
        url: 'https://' + window.location.host + '/smart-brain-front/' + this.selectedOrg.id.id + '/question-choice?token=',
        token: this.token
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });


  }

}
