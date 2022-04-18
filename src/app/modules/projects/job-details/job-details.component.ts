import { switchMap } from 'rxjs/operators';
import { ProjectsService } from '../projects.service';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsApiService } from '@services/jobs-api.service';
import { SubSink } from 'subsink';
import { JobComment } from '@classes/job-comment';
import { Job } from '@classes/job';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { JobSubmission } from '@classes/job-submission';
import { UsersService } from '@services/users.service';
import { JobPageService } from '../job-page.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  currUsername = '';
  comments: JobComment[] = [];

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
    private projectPageService: ProjectsService,
    private jobPageService: JobPageService,
    private usersService: UsersService,
    public ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.usersService.username$.subscribe(
      (username) => (this.currUsername = username || '')
    );

    this.subs.sink = this.jobPageService
      .getJob()
      .pipe(
        switchMap(() =>
          this.jobsApi.getJobComments(
            this.creator,
            this.projectName,
            this.jobNumber
          )
        )
      )
      .subscribe((comments) => {
        this.comments = comments;
        this.ref.markForCheck();
      });
  }

  postComment() {
    if (!this.newComment) return;

    this.submitting = true;
    this.subs.sink = this.jobsApi
      .postJobComment(
        this.creator,
        this.projectName,
        this.jobNumber,
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
