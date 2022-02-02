import {Component} from '@angular/core';
import {UserInfoService} from 'fappi-common-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'brief-report-app';

  constructor(private userInfoService: UserInfoService) {
    /*
    userInfoService.loggedOut.subscribe(() => {
      // FIXME display it again :alert('Vous ête déconnécté. Pour ne pas perdre votre travail, reconnectez vous dans un nouvel onglet.');
    });
    if ('ar' === document.getElementsByTagName('html')[0].getAttribute('lang')) {
      document.body.setAttribute('dir', 'rtl');
    }

     */
  }
}
