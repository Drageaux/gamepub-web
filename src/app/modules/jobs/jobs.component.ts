import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job, JobWithSubscriptionStatus } from '@classes/job';
import { Project } from '@classes/project';
import { ProjectsRoutesNames } from '@classes/routes.names';

import { JobsApiService } from '@services/jobs-api.service';
import { UsersService } from '@services/users.service';
import { ReplaySubject, Observable, Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit, OnDestroy {
  projectsLink = ProjectsRoutesNames.ROOT;
  jobsLink = ProjectsRoutesNames.JOBS;

  private subs = new SubSink();
  jobs$ = new ReplaySubject<JobWithSubscriptionStatus[]>(1);
  private loading = false; // prevent spamming subscribe buttons
  currUsername = ''; // only needed to compare subscribed status in UI

  constructor(
    private jobsApi: JobsApiService,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.jobsApi.getAllJobs().subscribe((jobs) => {
      this.jobs$.next(jobs);
    });

    this.subs.sink = this.usersService.username$.subscribe((name) => {
      this.currUsername = name || '';
    });
  }

  getProject(job: JobWithSubscriptionStatus): Project | null {
    if (!job.project || job.project instanceof String) return null;
    return job.project as Project;
  }

  getUser(project: Project): string | null {
    if (!project.creator) return null;
    return project.creator;
  }

  isSubscribed(job: JobWithSubscriptionStatus) {
    if (job?.subscribers?.length) {
      return job.subscribers.findIndex((x) => x === this.currUsername) !== -1;
    }
    return false;
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
        .pipe(withLatestFrom(this.jobs$)) // list of jobs to update in UI
        .subscribe(
          ([jobRes, jobs]) => {
            sub.unsubscribe();
            let indexToUpdate = jobs.findIndex((x) => x._id === jobRes._id);
            jobs[indexToUpdate].subscription = jobRes.subscription;
            this.jobs$.next(jobs);
            this.loading = false;
          },
          (err) => (this.loading = false)
        );
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
