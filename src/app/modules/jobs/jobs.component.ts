import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '@classes/job';
import { Project } from '@classes/project';
import { ProjectsRoutesNames } from '@classes/routes.names';

import { JobsApiService } from '@services/jobs-api.service';
import { UsersService } from '@services/users.service';
import { ReplaySubject, combineLatest } from 'rxjs';
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
  jobs$ = new ReplaySubject<Job[]>(1);
  currUsername = '';

  constructor(
    private jobsApi: JobsApiService,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.jobsApi.getAllJobs().subscribe((jobs) => {
      this.jobs$.next(jobs);
    });

    this.subs.sink = this.usersService.username$.subscribe(
      (name) => (this.currUsername = name || '')
    );
  }

  getProject(job: Job): Project | null {
    if (!job.project || job.project instanceof String) return null;
    return job.project as Project;
  }

  getUser(project: Project): string | null {
    if (!project.creator) return null;
    return project.creator;
  }

  subscribeToJob(job: Job) {
    const project = this.getProject(job);

    if (project?.creator && project?.name && job?.jobNumber) {
      const updateSubscription = this.jobsApi
        .subscribeToJobByJobNumber(project.creator, project.name, job.jobNumber)
        .pipe(withLatestFrom(this.jobs$)) // list of jobs to update in UI
        .subscribe(([res, jobs]) => {
          updateSubscription.unsubscribe();
          let indexToUpdate = jobs.findIndex((x) => x._id === res._id);
          jobs[indexToUpdate] = res;
          this.jobs$.next(jobs);
        });
    }
  }

  isSubscribed(job: Job) {
    if (job?.subscribers?.length) {
      return job.subscribers.findIndex((x) => x === this.currUsername) !== -1;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
