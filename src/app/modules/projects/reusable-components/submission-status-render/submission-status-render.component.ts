import { Component, Input, OnInit } from '@angular/core';
import {
  SubmissionStatusEnum,
  SubmissionStatusRenderEnum,
} from '@classes/job-submission';

@Component({
  selector: 'app-submission-status-render',
  templateUrl: './submission-status-render.component.html',
  styleUrls: ['./submission-status-render.component.scss'],
})
export class SubmissionStatusRenderComponent implements OnInit {
  SubmissionStatusEnum = SubmissionStatusEnum;
  SubmissionStatusRenderEnum = SubmissionStatusRenderEnum;
  @Input()
  status: SubmissionStatusEnum = SubmissionStatusEnum.OPEN;

  @Input()
  withText = true;

  constructor() {}

  ngOnInit(): void {
    console.log(this.status);
    console.log(SubmissionStatusRenderEnum[this.status]);
  }
}
