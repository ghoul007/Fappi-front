import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserInfoService} from 'fappi-common-model';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilViewComponent {

  // username:
  username: string;

  constructor(private router: Router, private route: ActivatedRoute, private userInfoService: UserInfoService) {
    this.userInfoService.infos().subscribe((userInfo) => {
      this.username = userInfo.name;
    });
  }

  onLangChanged(lang) {
    this.userInfoService.setLanguageInSession(lang).subscribe((lang).subscribe(() => {}));
  }
}
