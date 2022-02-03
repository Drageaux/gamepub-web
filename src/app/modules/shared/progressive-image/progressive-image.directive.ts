import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: 'img[appProgressiveImage]',
})
export class ProgressiveImageDirective {
  @HostBinding('attr.src')
  @Input()
  src = '';
  @Input() fallback = '';
  width!: number;
  height!: number;
  @Output() fallbackErrorEvent = new EventEmitter<boolean>();
  @Output() loadedEvent = new EventEmitter<boolean>();

  private triedFallback = false;

  constructor(public el: ElementRef) {}

  @HostListener('error', ['$event'])
  loadFallback($event: any) {
    // if already tried to load fallback, signal failure
    if (this.triedFallback) {
      this.fallbackErrorEvent.emit(true);
    } else {
      // directly chnage the src of the img tag to fallback
      this.src = this.fallback;
      this.triedFallback = true;
    }
  }

  @HostListener('load')
  onload() {
    this.loadedEvent.emit(true);
  }
}
