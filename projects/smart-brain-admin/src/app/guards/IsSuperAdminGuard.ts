import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {OrganizationService, UserInfoService, UserService} from "fappi-common-model";
import {map} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IsSuperAdminGuard implements CanActivate {

  constructor(public userInfoService: UserInfoService, private router: Router, private organizationService: OrganizationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return  this.userInfoService.hasAnyRole(['ADMIN', 'ROLE_ADMIN']).pipe(map((isAllowed) => {
      if (isAllowed) {
        return true;
      } else {
        this.router.navigate(['/org', '_', 'profil']);
        return false;
      }
    }));
  }
}
