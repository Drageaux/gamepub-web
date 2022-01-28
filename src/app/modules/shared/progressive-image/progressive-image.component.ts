import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ProgressiveImageDirective } from './progressive-image.directive';

@Component({
  selector: 'app-progressive-image',
  templateUrl: './progressive-image.component.html',
  styleUrls: ['./progressive-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressiveImageComponent implements OnInit, OnChanges {
  @Input() src = '';
  @Input() fallback = '';
  @Input() imgClass = '';
  @Input() imgAlt = '';
  @Output() imgLoadedEvent = new EventEmitter<ElementRef>();

  loading = true;
  noImage = false;

  @ViewChild(ProgressiveImageDirective)
  image!: ProgressiveImageDirective;

  constructor(private el: ElementRef, public cd: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.src) {
      this.loading = true;
    }
  }
}
