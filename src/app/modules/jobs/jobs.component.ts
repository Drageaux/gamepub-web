import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsComponent implements OnInit, OnDestroy {
  projectsLink = ProjectsRoutesNames.ROOT;
  jobsLink = ProjectsRoutesNames.JOBS;

  private subs = new SubSink();
  jobs: JobWithSubscriptionStatus[] = [];
  currUsername = ''; // only needed to compare subscribed status in UI

  constructor(
    private jobsApi: JobsApiService,
    public usersService: UsersService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.jobsApi.getAllJobs().subscribe((jobs) => {
      this.jobs = jobs;
      this.ref.markForCheck();
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

  updateJob(job: JobWithSubscriptionStatus, index: number) {
    // update only subscription field
    // avoid white flash when updating the entire object
    this.jobs[index].subscription = job.subscription;
    this.ref.markForCheck();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
