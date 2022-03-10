import { Injectable } from '@angular/core';
import { Project } from '@classes/project';
import { ProjectsApiService } from '@services/projects-api.service';
import { ReplaySubject, Observable, pipe } from 'rxjs';

/**
 * Share data among the ProjectComponent and its children.
 *
 * @service ProjectService
 */
@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
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
    if (username === this._username && projectName === this._username) {
      return;
    } else {
      this._username = username;
      this._projectname = projectName;
      this.projectsApi
        .getProjectByFullPath(this._username, this._projectname)
        .subscribe(
          (proj) => this.project$.next(proj),
          (err) => this.project$.next(null)
        );
    }
  }

  getProject(): Observable<Project | null> {
    return this.project$.asObservable();
  }
}
