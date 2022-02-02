import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-brain-admin';

  constructor() {
    if ('ar' === document.getElementsByTagName('html')[0].getAttribute('lang')) {
      document.body.setAttribute('dir', 'rtl');
    }
  }
}
