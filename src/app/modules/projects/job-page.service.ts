import { ProjectsService } from './projects.service';
import { SubSink } from 'subsink';
import { Injectable, OnDestroy } from '@angular/core';
import { Project } from '@classes/project';
import { ProjectsApiService } from '@services/projects-api.service';
import { ReplaySubject, Observable, pipe, BehaviorSubject, of } from 'rxjs';
import { Job } from '@classes/job';
import { JobsApiService } from '@services/jobs-api.service';
import { ProjectsModule } from './projects.module';
import { JobSubmission } from '@classes/job-submission';
import { switchMap, tap } from 'rxjs/operators';

/**
 * Share project data among the ProjectComponent and its children.
 * Useful for routing and "caching" project received from API.
 *
 * @service ProjectsService
 */
@Injectable({
  providedIn: 'root',
})
export class JobPageService implements OnDestroy {
  private subs = new SubSink();

  private _job$ = new ReplaySubject<Job | null>(1);
  private _jobNumber = 0;
  private _submissions$ = new BehaviorSubject<JobSubmission[]>([]);

  constructor(private jobsApi: JobsApiService) {}

  get jobNumber() {
    return this._jobNumber;
  }

  changeJob(creator: string, projectName: string, jobNumber: number) {
    if (creator == '' || projectName == '' || jobNumber === this._jobNumber)
      return;
    this._jobNumber = jobNumber;

    this.subs.sink = this.jobsApi
      .getJobByJobNumber(creator, projectName, this.jobNumber)
      .pipe(
        tap((job) => this._job$.next(job)),
        switchMap((job) => {
          if (!job || !job?.jobNumber) {
            throw new Error('Cannot parse job');
          } else {
            return this.jobsApi.getJobSubmissions(
              creator,
              projectName,
              job.jobNumber
            );
          }
        })
      )
      .subscribe((submissions) => {
        this._submissions$.next(submissions);
      });
  }

  getJob(): Observable<Job | null> {
    return this._job$.asObservable();
  }

  getSubmissions(): Observable<JobSubmission[]> {
    return this._submissions$.asObservable();
  }

  postSubmission(
    creator: string,
    projectName: string,
    jobNumber: number,
    input: JobSubmission
  ) {
    const { githubRepo, body } = input;

    return this.jobsApi
      .postJobSubmission(creator, projectName, jobNumber, {
        githubRepo: githubRepo.trim(),
        body: body?.trim(),
      } as JobSubmission)
      .pipe(
        tap((newSubmission) => {
          const newArr = [...this._submissions$.value, newSubmission];
          this._submissions$.next(newArr);
          return newSubmission;
        })
      );
  }

  resetJob(): void {
    this._job$.complete();
    this._job$ = new ReplaySubject<Job | null>(1);
    this._submissions$.complete();
    this._submissions$ = new BehaviorSubject<JobSubmission[]>([]);
    this._jobNumber = 0;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
