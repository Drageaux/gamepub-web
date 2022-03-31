import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@classes/project';
import { Observable, forkJoin, of, throwError, concat, scheduled } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  delay,
  toArray,
  concatMap,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { ApiResponse } from './api-response';
import { UsersApiService } from './users-api.service';
import { UsersService } from './users.service';
import json from '../../assets/test-data/steam-sample-games-2.json';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private usersApi: UsersApiService
  ) {}

  /*************************************************************************/
  /************************** ADMIN API ENDPOINTS **************************/
  /*************************************************************************/
  checkIsAdmin(): Observable<boolean> {
    return this.http
      .get<ApiResponse<null>>(`${this.apiUrl}/admin`, {
        observe: 'response',
      })
      .pipe(
        map((response) => response.status === 200),
        catchError(() => of(false))
      );
  }

  adminCreateProject(project: Project): Observable<Project> {
    // TODO: only admin can decide which profile to add to
    let arg = { ...project };
    if (!arg.creator) throw new Error('No creator provided');
    return this.http
      .post<ApiResponse<Project>>(`${this.apiUrl}/admin/projects`, arg)
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  parseSteamStore() {
    const games = [];
    const limit = 100;
    for (let i = 0; i < Math.min(limit, json.length); i++) {
      const game = json[i];
      const name = this.slugify(`-${game.name}-`, 35);
      const username = this.slugify(`--d-${game.developer}---`, 100);
      const email = username + '@gmail.com';
      games.push({
        name,
        displayName: game.name,
        creator: username,
        imageUrl: game.header_image,
        tags: game.genres.split(';').map((x) => x.toLocaleLowerCase()),
        private: i % 2 === 0,
      } as Project);
      console.log(games[i]);
    }
    return games;
  }

  createNewTestUsers(games: Project[]) {
    const requests = games.map((g) => {
      if (g?.creator)
        return this.usersApi.createUser(g.creator, 'Abcdefg1234').pipe(
          catchError((err) => {
            if (err.status == 409)
              return this.usersApi
                .getUserProfileByUsername(g.creator)
                .pipe(catchError((err) => of(null)));
            else return throwError(err);
          }),
          map(() => g),
          delay(1000)
        );
      else return of(null);
    });

    return concat(...requests);
  }

  createNewTestGames(
    games: Project[]
  ): Observable<(Project | null | undefined)[]> {
    // assume users are created, otherwise manually replace the get with create function
    return forkJoin(
      games.map((g) => {
        if (!g?.creator) return of(null);
        return this.usersApi.getUserProfileByUsername(g.creator).pipe(
          switchMap((user) => {
            if (!user) throw new Error('No user found');
            g.creator = user._id;
            return this.adminCreateProject({ ...g });
          }),
          catchError((err) => of(null))
        );
      })
    );
  }

  createNewTestGame(game: Project): Observable<Project | null | undefined> {
    // assume users are created, otherwise manually replace the get with create function
    return this.adminCreateProject({ ...game });
  }

  slugify(text: string, size = 70) {
    return text
      .toLocaleLowerCase()
      .replace(/\s+/g, '-') // convert to single space
      .slice(0, size) // truncate
      .replace(/(^-+)|[^a-zA-Z0-9- ]|(-+$)/g, '') // remove all leading and trailling hyphens
      .replace(/^-+|-+$|-+/g, '-'); // only get single hyphens
  }
}
