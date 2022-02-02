import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[slugOf]'
})
export class SlugGeneratorDirective {

  constructor(private el: ElementRef) {
  }

  /**
   * Must be an input
   */
  @Input('slugOf') set ref(ref: HTMLInputElement) {
    const target = this.el;
    const _t = this;
    if (ref) {
      ref.onkeyup = (event) => {
        target.nativeElement.value = _t.slugify(ref.value);
        target.nativeElement.dispatchEvent(new Event('input'));
      };
    }
  }

  private slugify(text): string {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

}
