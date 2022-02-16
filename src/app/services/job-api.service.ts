import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '@classes/job';
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
}
