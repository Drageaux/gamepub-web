import { SubSink } from 'subsink';
import { Injectable, OnDestroy } from '@angular/core';
import { Project } from '@classes/project';
import { ProjectsApiService } from '@services/projects-api.service';
import { ReplaySubject, Observable, pipe } from 'rxjs';

/**
 * Share project data among the ProjectComponent and its children.
 * Useful for routing and "caching" project received from API.
 *
 * @service ProjectsService
 */
@Injectable({
  providedIn: 'root',
})
export class ProjectsService implements OnDestroy {
  private subs = new SubSink();

  private project$ = new ReplaySubject<Project | null>(1);
  private _username = '';
  private _projectname = '';

  constructor(private projectsApi: ProjectsApiService) {}

  get username() {
    return this._username;
  }

  get projectname() {
    return this._projectname;
  }

  changeProject(username: string, projectName: string) {
    if (username === this._username && projectName === this._username) return;

    this._username = username;
    this._projectname = projectName;
    this.subs.sink = this.projectsApi
      .getProjectByFullPath(this._username, this._projectname)
      .subscribe(
        (proj) => this.project$.next(proj),
        (err) => this.project$.next(null)
      );
  }

  getProject(): Observable<Project | null> {
    return this.project$.asObservable();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
