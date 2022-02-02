import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserInfoService} from 'fappi-common-model';
import {HasGroupParams} from './hasgroup.directive';

@Directive({
  selector: '[fappiHasRole]'
})
export class HasroleDirective implements OnInit, OnDestroy {


  roles: string[];

  private permission$: Subscription;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private userInfoService: UserInfoService
  ) {
  }


  @Input() set fappiHasRole(roles: string[]) {
    this.roles = roles;
    this.applyPermission();
  }

  ngOnInit(): void {
    this.viewContainer.clear();
  }

  ngOnDestroy(): void {
    this.permission$.unsubscribe();
  }

  private applyPermission(): void {
    this.permission$ = this.userInfoService
      .hasRole(this.roles)
      .subscribe(authorized => {
        if (authorized) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

}
