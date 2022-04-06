import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '@classes/job';
import { JobComment } from '@classes/job-comment';
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

  subscribeToJobByJobNumber(
    username: string,
    projName: string,
    jobNumber: number | string
  ): Observable<Job> {
    return this.http
      .put<ApiResponse<Job>>(
        `${this.apiUrl}/users/${username}/projects/${projName}/jobs/${jobNumber}/subscribe`,
        {}
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
  ): Observable<Job> {
    return this.http
      .put<ApiResponse<Job>>(
        `${this.apiUrl}/users/${username}/projects/${projName}/jobs/${jobNumber}/unsubscribe`,
        {}
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
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
}
