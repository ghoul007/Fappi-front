import {AfterViewInit, Component, ContentChildren, Directive, Input, QueryList} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

/**
 * The content wrapper help to create a page with a common theme.
 *
 * Two displays are allowed :
 *  - With icon : An icons come in the title
 *  - Without icon : No icon is in the title
 *
 * Two sizes are allowed :
 *   - full-width : all the screen is took to render the display
 *   - small-width : the content take a small width and is centered.
 *
 *
 *
 */


@Directive({selector: 'left-zone'})
export class LeftZoneDirective {
}

@Directive({selector: 'main-zone'})
export class MainZoneDirective {
}

@Directive({selector: 'right-zone'})
export class RightZoneDirective {
}

@Directive({selector: 'breadcrumb'})
export class BreadcrumbDirective {
}


@Component({
  selector: 'app-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.scss']
})
export class ContentWrapperComponent implements AfterViewInit {

  hasLeft = false;
  hasRight = false;
  @Input()
  title: string;
  @Input()

  subTitle: string;
  @Input()
  withIcon: false;
  @Input()
  iconUrl = './assets/theme/scss/themes/img/avatar/img_avatar-defaut01.jpg';
  wrapperClass = '';
  @ContentChildren(LeftZoneDirective)
  private nav: QueryList<LeftZoneDirective>;
  @ContentChildren(RightZoneDirective)
  private righZone: QueryList<RightZoneDirective>;
  private pFullWidth = true;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.Tablet, Breakpoints.Web
    ]).subscribe(result => {
      if (result.matches) {
        this.wrapperClass = 'content-wrapper mat-elevation-z2 ';
      } else {
        this.wrapperClass = 'content-wrapper-mobile';
      }
    });
  }

  get fullWidth(): boolean {
    return this.pFullWidth;
  }

  @Input()
  set fullWidth(f: boolean) {
    this.pFullWidth = f;
  }

  ngAfterViewInit() {
    this.hasLeft = this.nav.length > 0;
    this.hasRight = this.righZone.length > 0;
  }

  get mainContentClass() {
    let otherClasses = '';
    if (!this.fullWidth) {
      return 'col-lg-12';
    } else {
      let colCount = 0;
      if (this.hasLeft) {
        colCount = colCount + 3;
      } else {
        otherClasses = otherClasses + ' offset-lg-1';
      }
      if (this.hasRight) {
        colCount = colCount + 3;
      }
      return `col-lg-${(10 - colCount)} ${otherClasses}`;
    }

  }

}
