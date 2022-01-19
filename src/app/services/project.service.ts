import { ApiResponse } from './api-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GithubContents } from '@classes/github-contents';
import { UnityManifest } from '@classes/unity-manifest';
import { Project } from '@classes/project';

import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap, map, shareReplay } from 'rxjs/operators';
import { ProjectModule } from '@modules/project/project.module';
import { UserService } from './shared/user.service';

@Injectable()
export class ProjectService {
  // data = testData;
  apiUrl = 'api/projects';

  constructor(private http: HttpClient, private userService: UserService) {}

  getProject(id: string): Observable<Project> {
    return this.http.get<ApiResponse<Project>>(`${this.apiUrl}/${id}`).pipe(
      shareReplay(1),
      map((res) => res.data)
    );
  }

  createProject(
    projectName: string,
    githubProject: string
  ): Observable<Project> {
    return this.http
      .post<ApiResponse<Project>>(`${this.apiUrl}`, {
        name: projectName,
        githubProject,
        creatorId: this.userService.id, // TODO: intercept or auto fill creator id
      })
      .pipe(map((res) => res.data));
  }

  loadRepoTree(project: string) {
    return this.http.get<GithubContents[]>(
      `https://api.github.com/repos/${project}/contents`
    );
  }

  parseManifest(manifest: UnityManifest) {
    // if (proj.default_branch) {
    // `https://api.github.com/repos/${owner}/${repo}/git/trees/${proj['default_branch']}/root?recursive=0`
    // } else return throwError('Cannot find default branch of project!');
    let unityRegistryPkgs = manifest.dependencies;
    console.log(unityRegistryPkgs);
    return unityRegistryPkgs;
  }

  getManifest(
    ghProject: string,
    path: string = 'Packages'
  ): Observable<UnityManifest> {
    // TODO: Sometimes the file may be in a different location, so we should support custom path later
    // NOTE: Packages or UnityPackageManager folder
    return this.http
      .get<GithubContents>(
        `https://api.github.com/repos/${ghProject}/contents/${path}/manifest.json`
      )
      .pipe(
        switchMap((res) => {
          // file type from this API endpoint has base64 encoded content
          if (res.type === 'file' && res.content) {
            const decoded = atob(res.content);
            return of(JSON.parse(decoded) as UnityManifest);
          } else throw new Error('Not a valid manifest file');
        }),
        // throw and catch error https://www.tektutorialshub.com/angular/using-throwerror-in-angular-observable/
        catchError((err) => {
          console.error(err);
          return throwError(err);
        })
      );
    // // uncomment below for test on custom file
    // return this.http.get<UnityManifest>('./assets/test-data/manifest.json');
  }
}
