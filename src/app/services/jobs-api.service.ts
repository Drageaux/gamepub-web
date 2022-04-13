import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job, JobWithSubscriptionStatus } from '@classes/job';
import { JobComment } from '@classes/job-comment';
import { JobSubmission } from '@classes/job-submission';
import { JobSubscription } from '@classes/job-subscription';
import { Project } from '@classes/project';
import { Observable, of } from 'rxjs';
import { shareReplay, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from './api-response';

@Injectable({
  providedIn: 'root',
})
export class JobsApiService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllJobs() {
    return this.http.get<ApiResponse<Job[]>>(`${this.apiUrl}/jobs`).pipe(
      shareReplay(1),
      map((res) => res.data)
    );
  }

  createJob(username: string, projectname: string, job: Job): Observable<Job> {
    return this.http
      .post<ApiResponse<Job>>(
        `${this.apiUrl}/users/${username}/projects/${projectname}/jobs`,
        job
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  getJobsByProject(username: string, projName: string): Observable<Job[]> {
    return this.http
      .get<ApiResponse<Job[]>>(
        `${this.apiUrl}/users/${username}/projects/${projName}/jobs`
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  getJobByJobNumber(
    username: string,
    projName: string,
    jobNumber: number | string
  ): Observable<Job> {
    return this.http
      .get<ApiResponse<Job>>(
        `${this.apiUrl}/users/${username}/projects/${projName}/jobs/${jobNumber}`
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  patchJobByJobNumber(
    username: string,
    projName: string,
    jobNumber: number | string,
    changes: Partial<Job>
  ): Observable<Job> {
    return this.http
      .patch<ApiResponse<Job>>(
        `${this.apiUrl}/users/${username}/projects/${projName}/jobs/${jobNumber}`,
        changes
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  subscribeToJobByJobNumber(
    username: string,
    projName: string,
    jobNumber: number | string,
    body: { accepted?: boolean; notified?: boolean }
  ): Observable<JobWithSubscriptionStatus> {
    return this.http
      .put<ApiResponse<JobWithSubscriptionStatus>>(
        `${this.apiUrl}/users/${username}/projects/${projName}/jobs/${jobNumber}/subscription`,
        { ...body }
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  unsubscribeFromJobByJobNumber(
    username: string,
    projName: string,
    jobNumber: number | string
  ): Observable<boolean> {
    return this.http
      .delete<ApiResponse<null>>(
        `${this.apiUrl}/users/${username}/projects/${projName}/jobs/${jobNumber}/subscription`,
        { observe: 'response' }
      )
      .pipe(
        shareReplay(1),
        map((response) => response.status >= 200 && response.status < 300)
      );
  }

  getJobComments(
    username: string,
    projName: string,
    jobNumber: number | string
  ): Observable<JobComment[]> {
    return this.http
      .get<ApiResponse<JobComment[]>>(
        `${this.apiUrl}/users/${username}/projects/${projName}/jobs/${jobNumber}/comments`
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  postJobComment(
    username: string,
    projName: string,
    jobNumber: number | string,
    body: string
  ): Observable<JobComment> {
    return this.http
      .post<ApiResponse<JobComment>>(
        `${this.apiUrl}/users/${username}/projects/${projName}/jobs/${jobNumber}/comments`,
        { body }
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  getJobSubmissions(
    username: string,
    projName: string,
    jobNumber: number | string
  ): Observable<JobSubmission[]> {
    return this.http
      .get<ApiResponse<JobSubmission[]>>(
        `${this.apiUrl}/users/${username}/projects/${projName}/jobs/${jobNumber}/submissions`
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  postJobSubmission(
    username: string,
    projName: string,
    jobNumber: number | string,
    body: JobSubmission
  ): Observable<JobSubmission> {
    return this.http
      .post<ApiResponse<JobSubmission>>(
        `${this.apiUrl}/users/${username}/projects/${projName}/jobs/${jobNumber}/submissions`,
        body
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }
}
