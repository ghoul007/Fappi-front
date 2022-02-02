import {Component, Input} from '@angular/core';
import {ContactResource} from '../../domain/model/ContactResource';

@Component({
  selector: 'app-crm-profil-badge',
  templateUrl: 'profil-badge.component.html',
  styleUrls: ['profil-badge.component.scss']
})
export class ProfilBadgeComponent {

  bgColor = '';
  initials = '';
  //small, medium, big
  @Input('size')
  size: string;
  colors: string[] = [
    '#5BC0EB',
    '#FDE74C',
    '#9BC53D',
    '#C3423F',
    '#211A1E',
    '#F44E3F'

  ];

  @Input('resource')
  set resource(r: ContactResource) {
    this.bgColor = this.color(r.firstname + ' ' + r.lastname);
    this.initials = this.getInitials(r);
  }

  color(s): string {
    let hash = s.split('').reduce(function(a, b) {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return this.colors[Math.abs(hash) % this.colors.length];
  }

  getInitials(r: ContactResource) {
    return this.getInitial(r.firstname) + this.getInitial(r.lastname);
  }

  getInitial(r: string): string {
    if (r && r.length > 0) {
      return r[0].toUpperCase();
    }
    return '';
  }


}
