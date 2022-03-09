import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  /*************************************************************************/
  /************************** ADMIN API ENDPOINTS **************************/
  /*************************************************************************/
  adminCreateProject(project: Project): Observable<Project> {
    return this.usersService.profile$.pipe(
      switchMap((profile) => {
        if (!profile?.username)
          throw new Error('User profile not found. Please log in again');
        // TODO: use this profile's id to create only
        // TODO: only admin can decide which profile to add to
        let arg = { ...project };
        if (!arg.creator) arg.creator = profile.username || ''; // TODO: intercept or auto fill creator id
        return this.http.post<ApiResponse<Project>>(
          `${this.apiUrl}/admin/projects`,
          arg
        );
      }),
      map((res) => res.data)
    );
  }

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
        creator: username,
        imageUrl: game.header_image,
        tags: game.genres.split(';').map((x) => x.toLocaleLowerCase()),
      } as Project);
      console.log(games[i]);
    }
    return games;
  }

  createNewTestUsers(games: Project[]) {
    return forkJoin(
      games.map((g) => {
        if (!g?.creator) return of(null);
        return this.usersApi
          .createUser(g.creator, 'Abcdefg')
          .pipe(
            catchError((err) =>
              this.usersApi
                .getUserProfileByUsername(g.creator)
                .pipe(catchError((err) => of(null)))
            )
          );
      })
    );
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
            g.creator = user._id;
            return this.adminCreateProject({ ...g });
          }),
          catchError((err) => of(null))
        );
      })
    );
  }
}
