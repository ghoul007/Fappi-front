import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UXMessageService} from 'fappi-ng-material-kit';
import {UserService} from 'fappi-common-model';


@Component({
  selector: 'app-show-user-view',
  templateUrl: './show-user-view.component.html',
  styleUrls: ['./show-user-view.component.scss']
})
export class ShowUserViewComponent {

  id: string;
  username: string;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,
              private route: ActivatedRoute, private uxMessageService: UXMessageService) {
    this.initData();
  }

  initData() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.userService.findOne(this.id).subscribe(user => {
          this.username = user.username;
        },
        (err) => this.uxMessageService.handleError(err)
      );
    });
  }


  back() {
    window.history.back();
  }

}
