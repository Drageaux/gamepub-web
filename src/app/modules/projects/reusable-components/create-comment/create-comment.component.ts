import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent implements OnInit {
  @Input() commentText = '';
  @Input() submitting = false;
  @Output() onTypeEvent = new EventEmitter<string>();
  @Output() onSubmitEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onType(e: any) {
    this.onTypeEvent.emit(e.target.value);
  }

  onSubmit(val: string) {
    this.onSubmitEvent.emit(val);
  }
}
