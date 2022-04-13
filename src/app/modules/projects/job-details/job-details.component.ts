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

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  currUsername = '';

  @Input()
  creator!: string;

  @Input()
  projectname!: string;

  @Input()
  jobnumber!: number | string;

  comments: JobComment[] = [];

  private subs = new SubSink();

  newComment = '';
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private jobsApi: JobsApiService,
    private usersService: UsersService,
    public ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.usersService.username$.subscribe(
      (username) => (this.currUsername = username || '')
    );

    this.subs.sink = this.jobsApi
      .getJobComments(this.creator, this.projectname, this.jobnumber)
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
        this.projectname,
        this.jobnumber,
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
}
