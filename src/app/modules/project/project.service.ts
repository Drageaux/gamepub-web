import { Injectable } from '@angular/core';
import { Project } from '@classes/project';
import { ProjectApiService } from '@services/project-api.service';
import { ReplaySubject, Observable } from 'rxjs';

/**
 * Share data among the ProjectComponent and its children.
 *
 * @service ProjectService
 */
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private project$ = new ReplaySubject<Project | null>(1);
  private _username = '';
  private _projectname = '';

  constructor(private projectApi: ProjectApiService) {}

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
      this.projectApi
        .getProjectByFullPath(this._username, this._projectname)
        .subscribe((proj) => {
          if (proj) this.project$.next(proj);
        });
    }
  }

  getProject(): Observable<Project | null> {
    return this.project$.asObservable();
  }
}
