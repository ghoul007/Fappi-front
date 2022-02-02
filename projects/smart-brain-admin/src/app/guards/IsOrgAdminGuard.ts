import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserInfoService, UserService} from "fappi-common-model";
import {of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IsOrgAdminGuard implements CanActivate {

  constructor(public userInfoService: UserInfoService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ( route.pathFromRoot.length > 1 && route.pathFromRoot[1].params.orgId ) {
       return  this.userInfoService.hasGroup(route.pathFromRoot[1].params.orgId, ['admin', 'admin_users'], true).pipe(map((isAllowed) => {
         if (isAllowed) {
           return true;
         } else {
            this.router.navigate(['/org', '_', 'profil']);
            return false;
         }
       }));
    }
    return of(false);
  }
}
