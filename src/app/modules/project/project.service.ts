import { Injectable } from '@angular/core';
import { Project } from '@classes/project';
import { ProjectApiService } from '@services/project-api.service';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';
import { ProjectModule } from './project.module';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private project$ = new BehaviorSubject<Project | null>(null);
  private username = '';
  private projectname = '';

  constructor(private projectApi: ProjectApiService) {}

  changeProject(username: string, projectName: string) {
    if (username === this.username && projectName === this.username) {
      return;
    } else {
      this.username = username;
      this.projectname = projectName;
      this.projectApi
        .getProjectByFullPath(username, projectName)
        .subscribe((proj) => {
          if (proj) this.project$.next(proj);
        });
    }
  }

  getProject(): Observable<Project | null> {
    return this.project$.asObservable();
  }
}
