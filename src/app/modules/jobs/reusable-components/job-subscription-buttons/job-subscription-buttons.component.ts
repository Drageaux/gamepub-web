import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { Job, JobWithSubscriptionStatus } from '@classes/job';
import { Project } from '@classes/project';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { JobsApiService } from '@services/jobs-api.service';
import { UsersService } from '@services/users.service';
import { withLatestFrom } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-job-subscription-buttons',
  templateUrl: './job-subscription-buttons.component.html',
  styleUrls: ['./job-subscription-buttons.component.scss'],
})
export class JobSubscriptionButtonsComponent implements OnInit {
  projectsLink = ProjectsRoutesNames.ROOT;
  jobsLink = ProjectsRoutesNames.JOBS;
  private subs = new SubSink();

  @Input() job!: Job;
  @Input() isCreator?: boolean;
  @Output() jobUpdatedEvent = new EventEmitter<JobWithSubscriptionStatus>();

  loading = false; // prevent spamming subscribe buttons

  constructor(
    private jobsApi: JobsApiService,
    public usersService: UsersService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  getProject(job: JobWithSubscriptionStatus): Project | null {
    if (!job.project || job.project instanceof String) return null;
    return job.project as Project;
  }

  /*************************************************************************/
  /***************************** EVENT HANDLERS ****************************/
  /*************************************************************************/
  /**
   * Accept and get notified.
   *
   * @param job
   */
  acceptJob(job: JobWithSubscriptionStatus) {
    this.updateSubscription(job, { accepted: true, notified: true });
  }

  /**
   * Unaccept and stop notifications.
   * @param job
   */
  unacceptJob(job: JobWithSubscriptionStatus) {
    this.updateSubscription(job, { accepted: false, notified: false });
  }

  /**
   * Only get notifications. No change to accepted status.
   *
   * @param job
   */
  getNotificationsAboutJob(job: JobWithSubscriptionStatus) {
    this.updateSubscription(job, {
      accepted: job?.subscription?.accepted || false,
      notified: true,
    });
  }

  /**
   * Only stop notifications. No change to accepted status.
   *
   * @param job
   */
  stopGettingNotificationsAboutJob(job: JobWithSubscriptionStatus) {
    this.updateSubscription(job, {
      accepted: job?.subscription?.accepted || false,
      notified: false,
    });
  }

  /*************************************************************************/
  /******************************* API CALLS *******************************/
  /*************************************************************************/
  updateSubscription(
    job: JobWithSubscriptionStatus,
    body: { accepted?: boolean; notified?: boolean }
  ) {
    const project = this.getProject(job);

    if (!this.loading && project?.creator && project?.name && job?.jobNumber) {
      this.loading = true;
      const sub = this.jobsApi
        .subscribeToJobByJobNumber(
          project.creator,
          project.name,
          job.jobNumber,
          body
        )
        .subscribe(
          (job: JobWithSubscriptionStatus) => {
            sub.unsubscribe();
            this.jobUpdatedEvent.emit(job);
            this.loading = false;
            this.ref.markForCheck();
          },
          (err) => {
            sub.unsubscribe();
            this.loading = false;
            this.ref.markForCheck();
          }
        );
    }
  }
}
