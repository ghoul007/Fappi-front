


import {AfterViewInit, Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-wrapper',
  templateUrl: './card-wrapper.component.html',
  styleUrls: ['./card-wrapper.component.scss']
})
// FIXME remove.
export class CardWrapperComponent implements AfterViewInit {

  @Input()
  title: string;

  @Input()
  subTitle: string;


  ngAfterViewInit(): void {
  }

}
