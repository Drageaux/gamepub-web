import { AuthService, User } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { ApiResponse } from '@services/api-response';
import {
  catchError,
  concatMap,
  map,
  pluck,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { UsersApiService } from './users-api.service';
import { environment } from 'src/environments/environment';
import { Profile } from '@classes/profile';
import { SubSink } from 'subsink';

/**
 * Service providing logged in user profile data.
 */
@Injectable({
  providedIn: 'root',
})
export class UsersService implements OnDestroy {
  private subs = new SubSink();
  private _metadata$ = new ReplaySubject<any>(1); // profile
  private environment = environment;

  constructor(
    private http: HttpClient,
    private userApi: UsersApiService,
    private auth: AuthService
  ) {
    // TODO: don't throw hard error if not logged in
    // TODO: reinit this service if login changes
    this.subs.sink = this.auth
      .getUser()
      .pipe(
        concatMap((user) => {
          if (!user) throw new Error('User not authenticated');
          // Use HttpClient to make the call
          return this.http.get(
            encodeURI(
              `https://${this.environment.authDomain}/api/v2/users/${user?.sub}`
            )
          );
        }),
        tap((meta) => console.log(meta))
      )
      .subscribe((meta) => this._metadata$.next(meta));
  }

  public get profile$(): Observable<Profile> {
    return this._metadata$.pipe(
      map((meta) => {
        if (!meta) throw Error('User not authenticated');
        const { user_id, username, email, app_metadata, user_metadata } = meta;
        return { _id: user_id, username, email, app_metadata, user_metadata };
      })
    );
  }

  public get username$(): Observable<string | null | undefined> {
    return this.profile$.pipe(
      map((profile) => {
        return profile?.username;
      })
    );
  }

  // public get username$() {
  //   return this._metadata$.
  // }

  // public getUserProfileById(id: string) {
  //   return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`).pipe(
  //     shareReplay(1),
  //     map((res) => res.data)
  //   );
  // }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
