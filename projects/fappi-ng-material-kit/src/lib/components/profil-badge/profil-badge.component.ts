import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-profil-badge',
  templateUrl: 'profil-badge.component.html',
  styleUrls: ['profil-badge.component.scss']
})
export class ProfilBadgeComponent {

  bgColor = '';
  initials = '';

  // small, medium, big

  @Input('size')
  size: string;
  colors: string[] = [
    '#5BC0EB',
    '#FDE74C',
    '#9BC53D',
    '#C3423F',
    '#ffc82f',
    '#F44E3F'

  ];

  @Input('text')
  set resource(text) {
    this.bgColor = this.color(text);
    this.initials = this.getInitials(text);
  }

  color(s): string {
    const hash = s.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return this.colors[Math.abs(hash) % this.colors.length];
  }

  getInitials(text: string) {
    return this.getInitial(text);
  }

  getInitial(r: string): string {
    if (r && r.length > 0) {
      return r[0].toUpperCase();
    }
    return '';
  }


}
