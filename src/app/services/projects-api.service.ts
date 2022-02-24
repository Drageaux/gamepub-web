import { ApiResponse } from '@services/api-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GithubContents } from '@classes/github-contents';
import { UnityManifest } from '@classes/unity-manifest';
import { Project } from '@classes/project';

import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap, map, shareReplay } from 'rxjs/operators';
import { UsersService } from './users.service';

import json from '../../assets/test-data/steam-sample-games-2.json';
import { User } from '@classes/user';
import { UsersApiService } from './users-api.service';
import { environment } from 'src/environments/environment';

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
        shareReplay(10),
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
    return this.usersService.myProfile$.pipe(
      switchMap((profile) => {
        // TODO: use this profile's id to create only
        // TODO: only admin can decide which profile to add to
        let arg = { ...project };
        if (!arg.creator) arg.creator = profile._id; // TODO: intercept or auto fill creator id
        return this.http.post<ApiResponse<Project>>(
          `${this.apiUrl}/projects`,
          arg
        );
      }),
      map((res) => res.data)
    );
  }

  isProjectNameTaken(value: string): Observable<boolean> {
    return this.usersService.myProfile$.pipe(
      switchMap((profile) => {
        return this.http.post<ApiResponse<null>>(
          `${this.apiUrl}/projects/check-name`,
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

  /*************************************************************************/
  /************************** IMPORT DATA SCRIPTS **************************/
  /*************************************************************************/

  parseSteamStore() {
    const games = [];
    const limit = 250;
    for (let i = 0; i < Math.min(limit, json.length); i++) {
      const game = json[i];
      const name = this.generateUniformProjectName(
        this.removeIllegalCharacters(`-${game.name}-`)
      );
      const username =
        'd-' +
        this.generateUniformProjectName(
          this.removeIllegalCharacters(`-${game.developer}---`)
        );
      const email = username + '@gmail.com';
      games.push({
        name,
        displayName: game.name,
        creator: {
          username,
          email,
        },
        imageUrl: game.header_image,
        tags: game.genres.split(';').map((x) => x.toLocaleLowerCase()),
      } as Project);
      console.log(games[i]);
    }
    return games;
  }

  createNewTestUsers(games: Project[]): Observable<(string | User | null)[]> {
    return forkJoin(
      games.map((g) =>
        this.usersApi
          .createUser((g.creator as User).username, 'test')
          .pipe(
            catchError((err) =>
              this.usersApi
                .getUserProfileByUsername((g.creator as User).username)
                .pipe(catchError((err) => of(null)))
            )
          )
      )
    );
  }

  createNewTestGames(games: Project[]): Observable<(Project | null)[]> {
    // assume users are created, otherwise manually replace the get with create function
    return forkJoin(
      games.map((g) => {
        if (!g) return of(null);
        return this.usersApi
          .getUserProfileByUsername((g.creator as User).username)
          .pipe(
            switchMap((user) => {
              g.creator = user._id;
              return this.createProject({ ...g });
            }),
            catchError((err) => of(null))
          );
      })
    );
  }

  /**
   * Only allow alphanumeric, as well as single hyphens but not at the start nor end.
   *
   * @param val
   * @returns
   */
  removeIllegalCharacters(val: string) {
    const result = val
      .replace(/(^-+)|[^a-zA-Z0-9- ]|(-+$)/g, '') // remove all leading and trailling hyphens
      .replace(/^-+|-+$|-+/g, '-'); // only get single hyphens

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
      .split(/\s+/)
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
