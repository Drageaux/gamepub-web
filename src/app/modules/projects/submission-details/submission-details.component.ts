import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from '@classes/job';
import { JobComment } from '@classes/job-comment';
import { JobSubmission, SubmissionStatusEnum } from '@classes/job-submission';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { JobsApiService } from '@services/jobs-api.service';
import { UsersService } from '@services/users.service';
import { ReplaySubject, combineLatest } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { JobPageService } from '../job-page.service';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-submission-details',
  templateUrl: './submission-details.component.html',
  styleUrls: ['./submission-details.component.scss'],
})
export class SubmissionDetailsComponent implements OnInit {
  private subs = new SubSink();
  currUsername = '';
  job$ = new ReplaySubject<Job>(1);
  status: SubmissionStatusEnum = SubmissionStatusEnum.OPEN;
  submission$ = new ReplaySubject<JobSubmission>(1);
  comments: JobComment[] = [];

  submissionParamName = ProjectsRoutesNames.JOBSUBMISSIONPARAMNAME;

  newComment = '';
  submitting = false;

  get creator() {
    return this.projectPageService.username;
  }

  get projectName() {
    return this.projectPageService.projectname;
  }

  get jobNumber() {
    return this.jobPageService.jobNumber;
  }

  constructor(
    private route: ActivatedRoute,
    private jobsApi: JobsApiService,
    public projectPageService: ProjectsService,
    private jobPageService: JobPageService,
    private usersService: UsersService,
    public ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.usersService.username$.subscribe(
      (username) => (this.currUsername = username || '')
    );

    this.subs.sink = this.jobPageService.getJob().subscribe((job) => {
      if (job) {
        this.job$.next(job);
      }
    });

    this.subs.sink = this.route.params
      .pipe(
        withLatestFrom(this.jobPageService.getJob()),
        switchMap(([params, job]) =>
          combineLatest([
            this.jobsApi.getJobSubmission(
              this.creator,
              this.projectName,
              this.jobNumber,
              params[this.submissionParamName]
            ),
            this.jobsApi.getSubmissionThreadComments(
              this.creator,
              this.projectName,
              this.jobNumber,
              params[this.submissionParamName]
            ),
          ])
        )
      )
      .subscribe(([submissionDetails, comments]) => {
        this.submission$.next(submissionDetails);
        this.status = submissionDetails.status;
        this.comments = comments;
        this.ref.markForCheck();
      });
  }

  postComment() {
    if (!this.newComment) return;
    this.submitting = true;
    this.subs.sink = this.jobsApi
      .postSubmissionComment(
        this.creator,
        this.projectName,
        this.jobNumber,
        this.route.snapshot.params[this.submissionParamName],
        this.newComment
      )
      .subscribe(
        (comment) => {
          this.newComment = '';
          this.submitting = false;
          this.comments = [...this.comments, comment];
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

  approveSubmission() {
    this.subs.sink = this.jobsApi
      .updateSubmissionStatus(
        this.creator,
        this.projectName,
        this.jobNumber,
        this.route.snapshot.params[this.submissionParamName],
        SubmissionStatusEnum.APPROVED
      )
      .subscribe(() => {
        this.status = SubmissionStatusEnum.APPROVED;
        this.ref.markForCheck();
      });
  }

  rejectSubmission() {
    this.subs.sink = this.jobsApi
      .updateSubmissionStatus(
        this.creator,
        this.projectName,
        this.jobNumber,
        this.route.snapshot.params[this.submissionParamName],
        SubmissionStatusEnum.CLOSED
      )
      .subscribe(() => {
        this.status = SubmissionStatusEnum.CLOSED;
        this.ref.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
