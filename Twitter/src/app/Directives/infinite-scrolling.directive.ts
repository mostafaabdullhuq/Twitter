import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScrolling]',
})
export class InfiniteScrollingDirective {
  constructor() {}
  // host listner for scroll event
  @HostListener('wheel', ['$event'])
  onScroll(event: any) {
    const element = event;
    // // console.log(element);

    // if (element.scrollHeight - element.scrollTop === element.clientHeight) {
    // }
    this.scrolled.emit(true);
  }

  @Output() scrolled = new EventEmitter<boolean>();
}
