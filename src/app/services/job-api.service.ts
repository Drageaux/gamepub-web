import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '@classes/job';
import { JobComment } from '@classes/job-comment';
import { Project } from '@classes/project';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { ApiResponse } from './api-response';

@Injectable({
  providedIn: 'root',
})
export class JobApiService {
  prefix = 'api';

  constructor(private http: HttpClient) {}

  createJob(username: string, projectname: string, job: Job): Observable<Job> {
    return this.http
      .post<ApiResponse<Job>>(
        `${this.prefix}/users/${username}/projects/${projectname}/jobs`,
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
        `${this.prefix}/users/${username}/projects/${projName}/jobs`
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
        `${this.prefix}/users/${username}/projects/${projName}/jobs/${jobNumber}/comments`,
        { body }
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }
}
