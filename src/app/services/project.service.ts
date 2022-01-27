import { ApiResponse } from './api-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GithubContents } from '@classes/github-contents';
import { UnityManifest } from '@classes/unity-manifest';
import { Project } from '@classes/project';

import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap, map, shareReplay } from 'rxjs/operators';
import { UserService } from '../modules/shared/user.service';

import json from '../../assets/test-data/steam-sample-games-1.json';

@Injectable()
export class ProjectService {
  // data = testData;
  prefix = 'api';

  constructor(private http: HttpClient, private userService: UserService) {}

  /*************************************************************************/
  /****************************** API REQUESTS *****************************/
  /*************************************************************************/
  getProjectByFullPath(
    username: string,
    projName: string
  ): Observable<Project> {
    return this.http
      .get<ApiResponse<Project>>(
        `${this.prefix}/users/${username}/projects/${projName}`
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  getProjectById(projId: string): Observable<Project> {
    return this.http
      .get<ApiResponse<Project>>(`${this.prefix}/projects/${projId}`)
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  getProjectsByUsername(username: string): Observable<Project[]> {
    return this.http
      .get<ApiResponse<Project[]>>(`${this.prefix}/users/${username}/projects`)
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  createProject(project: Project): Observable<Project> {
    return this.userService.profile$.pipe(
      switchMap((profile) => {
        return this.http.post<ApiResponse<Project>>(`${this.prefix}/projects`, {
          ...project,
          creator: profile._id, // TODO: intercept or auto fill creator id
        });
      }),
      map((res) => res.data)
    );
  }

  isProjectNameTaken(value: string): Observable<boolean> {
    return this.userService.profile$.pipe(
      switchMap((profile) => {
        return this.http.post<ApiResponse<null>>(
          `${this.prefix}/projects/check-name`,
          {
            name: value,
            creator: profile._id,
          },
          { observe: 'response' }
        );
      }),
      map((response) => response.status != 200),
      catchError(() => of(true))
    );
  }

  uploadProjectImage(projId: string, file: File | string) {
    return this.http
      .put<ApiResponse<any>>(`${this.prefix}/projects/${projId}/image`, {
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

  /*************************************************************************/
  /************************** IMPORT DATA SCRIPTS **************************/
  /*************************************************************************/
  parseSteamStore() {
    const limit = 10;
    const games = [];
    for (let i = 0; i < Math.min(limit, json.length); i++) {
      const game = json[i];
      games.push({
        name: this.generateUniformProjectName(
          this.removeIllegalCharacters(`-${game.name}-`)
        ),
        creator: this.generateUniformProjectName(
          this.removeIllegalCharacters(`-${game.developer}-`)
        ),
      });
      console.log(games[i].name);
    }

    forkJoin(
      games.map((g) => this.userService.createUser('d-' + g.creator, 'test'))
    ).subscribe(console.log, console.error);
  }

  /**
   * Only allow alphanumeric and hyphens, but not at the start nor end.
   *
   * @param val
   * @returns
   */
  removeIllegalCharacters(val: string) {
    // const result = val.replace(/[&\/\\#,+()$~%.'":*?<>{}=!?]/g, '');
    const result = val.replace(/[^a-zA-Z0-9- ]|(^-)|(-$)/g, '');
    return result;
  }

  /**
   * Turn normal text into kebab-case name.
   *
   * @param rawName
   * @returns
   */
  public generateUniformProjectName(rawName: string) {
    const result = rawName
      .trim()
      .toLocaleLowerCase()
      .split(' ')
      .reduce((prev, curr, index) => {
        let res = '';
        if (index > 0) {
          res += '-';
        }
        return prev + res + curr;
      }, '');
    return result;
  }
}
