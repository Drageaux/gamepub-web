import { ProjectService } from './../project.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobApiService } from '@services/job-api.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  username!: string;
  projectname!: string;
  jobnumber!: number | string;

  newComment = '';
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private jobApi: JobApiService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.username = this.projectService.username;
    this.projectname = this.projectService.projectname;
    this.jobnumber = parseInt(this.route.snapshot.params['jobnumber']);
  }

  postComment() {
    if (!this.newComment) return;

    this.submitting = true;
    this.jobApi
      .postJobComment(
        this.username,
        this.projectname,
        this.jobnumber,
        this.newComment
      )
      .subscribe(
        (comment) => {
          this.newComment = '';
          // TODO: push new comment to array
        },
        console.error,
        () => {
          this.submitting = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
