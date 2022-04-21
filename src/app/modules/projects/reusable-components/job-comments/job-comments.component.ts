import { Component, OnInit, Input } from '@angular/core';
import { JobComment } from '@classes/job-comment';

@Component({
  selector: 'app-job-comments',
  templateUrl: './job-comments.component.html',
  styleUrls: ['./job-comments.component.scss'],
})
export class JobCommentsComponent implements OnInit {
  @Input()
  comments: JobComment[] = [];

  @Input()
  creator = '';

  @Input()
  currUsername = '';

  constructor() {}

  ngOnInit(): void {}

  isCommenterCreator(commenter: string) {
    return this.creator && commenter && this.creator === commenter;
  }
}
