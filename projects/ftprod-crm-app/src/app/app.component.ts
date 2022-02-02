import {Component, Renderer2} from '@angular/core';
import {UXMessageService} from 'fappi-ng-material-kit';
import {SuperAdminService} from 'fappi-common-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ftprod-crm-app';

  constructor(private uxMessageService: UXMessageService, superadminService: SuperAdminService, renderer2: Renderer2) {
    superadminService.findCurrent().subscribe((c) => {
      renderer2.addClass(document.body, c.personalization.colorScheme);
    });
    if ('ar' === document.getElementsByTagName('html')[0].getAttribute('lang')) {
      document.body.setAttribute('dir', 'rtl');
    }
  }
}
