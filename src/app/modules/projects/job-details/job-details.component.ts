import { ProjectsService } from '../projects.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsApiService } from '@services/jobs-api.service';
import { SubSink } from 'subsink';
import { JobComment } from '@classes/job-comment';
import { Job } from '@classes/job';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { JobSubmission } from '@classes/job-submission';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  private username!: string;
  private projectname!: string;
  private jobnumber!: number | string;

  newJobLink = ProjectsRoutesNames.NEWJOB;
  jobParamName = ProjectsRoutesNames.JOBPARAMNAME;

  job!: Job;
  comments!: JobComment[];
  submissions!: JobSubmission[];
  submissionsLimit = 5;

  newComment = '';
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private jobsApi: JobsApiService,
    private projectsService: ProjectsService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.username = this.projectsService.username;
    this.projectname = this.projectsService.projectname;
    this.jobnumber = parseInt(this.route.snapshot.params[this.jobParamName]);

    this.subs.sink = this.jobsApi
      .getJobByJobNumber(this.username, this.projectname, this.jobnumber)
      .subscribe((job) => {
        this.job = job;
        this.ref.markForCheck();
      });

    this.subs.sink = this.jobsApi
      .getJobComments(this.username, this.projectname, this.jobnumber)
      .subscribe((comments) => {
        this.comments = comments;
        this.ref.markForCheck();
      });

    this.subs.sink = this.jobsApi
      .getJobSubmissions(this.username, this.projectname, this.jobnumber)
      .subscribe((submissions) => {
        this.submissions = submissions;
        this.ref.markForCheck();
      });
  }

  postComment() {
    if (!this.newComment) return;

    this.submitting = true;
    this.subs.sink = this.jobsApi
      .postJobComment(
        this.username,
        this.projectname,
        this.jobnumber,
        this.newComment
      )
      .subscribe(
        (comment) => {
          this.newComment = '';
          this.submitting = false;
          // TODO: push new comment to array
          this.ref.markForCheck();
        },
        (err) => {
          // TODO: display error message
          console.error(err);
          this.submitting = false;
          this.ref.markForCheck();
        }
      );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
