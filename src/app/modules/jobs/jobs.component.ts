import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Job } from '@classes/job';
import { Project } from '@classes/project';
import { ProjectsRoutesNames } from '@classes/routes.names';

import { JobsApiService } from '@services/jobs-api.service';
import { Subject } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit, OnDestroy {
  projectsLink = `${ProjectsRoutesNames.ROOT}`;
  jobsLink = `${ProjectsRoutesNames.JOBS}`;

  private subs = new SubSink();
  jobs$ = new Subject<Job[]>();

  constructor(private jobsApi: JobsApiService) {}

  ngOnInit(): void {
    this.subs.sink = this.jobsApi.getAllJobs().subscribe((jobs) => {
      this.jobs$.next(jobs);
    });
  }

  getProject(job: Job): Project | null {
    if (!job.project || job.project instanceof String) return null;

    return job.project as Project;
  }

  getUser(project: Project): User | null {
    if (!project.creator || project.creator instanceof String) return null;
    return project.creator as User;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
