import { ApiResponse } from '@services/api-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GithubContents } from '@classes/github-contents';
import { UnityManifest } from '@classes/unity-manifest';
import { Project } from '@classes/project';

import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap, map, shareReplay } from 'rxjs/operators';
import { UsersService } from './users.service';

import { UsersApiService } from './users-api.service';
import { environment } from 'src/environments/environment';
import { Profile } from '@classes/profile';

@Injectable({
  providedIn: 'root',
})
export class ProjectsApiService {
  // data = testData;
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private usersApi: UsersApiService
  ) {}

  /*************************************************************************/
  /****************************** API REQUESTS *****************************/
  /*************************************************************************/
  getProjectByFullPath(
    username: string,
    projName: string
  ): Observable<Project> {
    return this.http
      .get<ApiResponse<Project>>(
        `${this.apiUrl}/users/${username}/projects/${projName}`
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  getProjectById(projId: string): Observable<Project> {
    return this.http
      .get<ApiResponse<Project>>(`${this.apiUrl}/projects/${projId}`)
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  getProjectsByUsername(username: string): Observable<Project[]> {
    return this.http
      .get<ApiResponse<Project[]>>(`${this.apiUrl}/users/${username}/projects`)
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  getAllProjects(): Observable<Project[]> {
    return this.http
      .get<ApiResponse<Project[]>>(`${this.apiUrl}/projects`)
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  createProject(project: Project): Observable<Project> {
    let body = { ...project };
    return this.http
      .post<ApiResponse<Project>>(`${this.apiUrl}/projects`, body)
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  isProjectNameTaken(name: string): Observable<boolean> {
    return this.http
      .post<ApiResponse<null>>(
        `${this.apiUrl}/projects/check-name`,
        { name },
        { observe: 'response' }
      )
      .pipe(
        map((response) => response.status != 200),
        catchError(() => of(true))
      );
  }

  uploadProjectImage(projId: string, file: File | string) {
    return this.http
      .put<ApiResponse<any>>(`${this.apiUrl}/projects/${projId}/image`, {
        image: file,
      })
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  uploadProjectImageByProjectId(projId: string, file: File | string) {
    return this.http
      .put<ApiResponse<any>>(`${this.apiUrl}/projects/${projId}/image`, {
        image: file,
      })
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  /*************************************************************************/
  /******************************** DETAILS ********************************/
  /*************************************************************************/
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
