import { ProjectsService } from '../projects.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsApiService } from '@services/jobs-api.service';
import { SubSink } from 'subsink';
import { JobComment } from '@classes/job-comment';
import { Job } from '@classes/job';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { JobSubmission } from '@classes/job-submission';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  private _username!: string;
  private _projectname!: string;
  private _jobnumber!: number | string;

  newJobLink = ProjectsRoutesNames.NEWJOB;
  jobParamName = ProjectsRoutesNames.JOBPARAMNAME;
  submissionsLink = ProjectsRoutesNames.JOBSUBMISSIONS;
  submissionParamName = ProjectsRoutesNames.JOBSUBMISSIONPARAMNAME;

  currUsername = '';
  job!: Job;
  comments!: JobComment[];
  submissions!: JobSubmission[];
  submissionsLimit = 5;

  newComment = '';
  submitting = false;

  get username() {
    return this._username;
  }

  constructor(
    private route: ActivatedRoute,
    private jobsApi: JobsApiService,
    private projectsService: ProjectsService,
    private usersService: UsersService,
    public ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._username = this.projectsService.username;
    this._projectname = this.projectsService.projectname;
    this._jobnumber = parseInt(this.route.snapshot.params[this.jobParamName]);

    this.subs.sink = this.usersService.username$.subscribe(
      (username) => (this.currUsername = username || '')
    );

    this.subs.sink = this.jobsApi
      .getJobByJobNumber(this._username, this._projectname, this._jobnumber)
      .subscribe((job) => {
        this.job = job;
        this.ref.markForCheck();
      });

    this.subs.sink = this.jobsApi
      .getJobComments(this._username, this._projectname, this._jobnumber)
      .subscribe((comments) => {
        this.comments = comments;
        this.ref.markForCheck();
      });

    this.subs.sink = this.jobsApi
      .getJobSubmissions(this._username, this._projectname, this._jobnumber)
      .subscribe((submissions) => {
        this.submissions = submissions.sort(
          (a, b) => (a.submissionNumber || 0) - (b?.submissionNumber || 0)
        );
        this.ref.markForCheck();
      });
  }

  postComment() {
    if (!this.newComment) return;

    this.submitting = true;
    this.subs.sink = this.jobsApi
      .postJobComment(
        this._username,
        this._projectname,
        this._jobnumber,
        this.newComment
      )
      .subscribe(
        (comment) => {
          this.newComment = '';
          this.submitting = false;
          // TODO: push new comment to array
          this.ref.detectChanges();
        },
        (err) => {
          // TODO: display error message
          console.error(err);
          this.submitting = false;
          this.ref.detectChanges();
        }
      );
  }

  isCreator() {
    return this._username === this.currUsername;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
