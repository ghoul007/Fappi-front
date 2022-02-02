import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'prettyOctet'})
export class PrettyOctetPipe implements PipeTransform {
  transform(value: number): string {

    if (!value) {
      return '-';
    }
    (6).toLocaleString('en-US', {maximumFractionDigits: 2});
    let val = '-';
    if (value > 1024 * 1024 * 1024) { // go
      val = (value / (1024 * 1024 * 1024)).toLocaleString('en-US', {maximumFractionDigits: 2}) + ' Go';
    } else if (value > 1024 * 1024) { // mo
      val = (value / (1024 * 1024)).toLocaleString('en-US', {maximumFractionDigits: 2}) + ' Mo';
    } else if (value > 1024) { // ko
      val = (value / (1024)).toLocaleString('en-US', {maximumFractionDigits: 2}) + ' ko';
    } else {
      val = value + ' o';
    }
    return val;
  }
}
