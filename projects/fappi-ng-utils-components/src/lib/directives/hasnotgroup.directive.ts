import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {forkJoin, zip} from 'rxjs';
import {UserInfoService} from 'fappi-common-model';
import {map, tap} from 'rxjs/operators';


export class HasNotGroupParams {
  orgId: string;
  groups: string[];
}

@Directive({
  selector: '[fappiHasNotGroup]'
})
export class HasNotGroupDirective implements OnInit, OnDestroy {

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private userInfoService: UserInfoService
  ) {
  }

  @Input() set fappiHasNotGroup(value: HasNotGroupParams) {
    if ( value?.orgId ) {
      this.applyPermission(value);
    }
  }

  ngOnInit(): void {
    this.viewContainer.clear();
  }

  ngOnDestroy(): void {
  }

  private applyPermission(orgGroups: HasNotGroupParams): void {
    const isSuperadmin = this.userInfoService.hasRole(['ROLE_ADMIN']);
    const hasGroup = this.userInfoService
      .hasGroup(orgGroups.orgId, orgGroups.groups, true);
    forkJoin([isSuperadmin, hasGroup]).pipe(
      map(([isSuperadmin$, hasGroup$]) => isSuperadmin$ || hasGroup$),
    )
      .subscribe(hasRight => {
        if (!hasRight) {
          this.viewContainer.clear();
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

}
