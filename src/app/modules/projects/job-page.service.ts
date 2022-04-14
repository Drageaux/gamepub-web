import { ProjectsService } from './projects.service';
import { SubSink } from 'subsink';
import { Injectable, OnDestroy } from '@angular/core';
import { Project } from '@classes/project';
import { ProjectsApiService } from '@services/projects-api.service';
import { ReplaySubject, Observable, pipe } from 'rxjs';
import { Job } from '@classes/job';
import { JobsApiService } from '@services/jobs-api.service';
import { ProjectsModule } from './projects.module';

/**
 * Share project data among the ProjectComponent and its children.
 * Useful for routing and "caching" project received from API.
 *
 * @service ProjectsService
 */
@Injectable({
  providedIn: ProjectsModule,
})
export class JobPageService implements OnDestroy {
  private subs = new SubSink();

  private _job$ = new ReplaySubject<Job | null>(1);
  private _jobNumber = 0;

  constructor(
    private projectsService: ProjectsService,
    private jobsApi: JobsApiService
  ) {
    console.log('init:', projectsService.RandomNo);
  }

  get creator() {
    return this.projectsService.username;
  }

  get projectName() {
    return this.projectsService.projectname;
  }

  get jobNumber() {
    return this._jobNumber;
  }

  changeJob(jobNumber: number) {
    if (jobNumber === this._jobNumber) return;
    this._jobNumber = jobNumber;
    console.log(this.projectsService.username);
    console.log(this.creator);

    this.subs.sink = this.jobsApi
      .getJobByJobNumber(this.creator, this.projectName, this.jobNumber)
      .subscribe(
        (job) => this._job$.next(job),
        (err) => this._job$.next(null)
      );
  }

  getJob(): Observable<Job | null> {
    return this._job$.asObservable();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
