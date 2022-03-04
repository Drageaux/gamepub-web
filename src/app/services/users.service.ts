import { AuthService, User } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthUser } from '@classes/user';
import { ApiResponse } from '@services/api-response';
import { map, shareReplay } from 'rxjs/operators';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // TODO: use dynamic user ID and implement login
  private _myUsername: string = 'davidtn';
  private _myProfile$!: Observable<User | null | undefined>;

  constructor(
    private http: HttpClient,
    private userApi: UsersApiService,
    private auth: AuthService
  ) {
    this._myProfile$ = this.auth.user$;
  }

  public get myProfile$() {
    return this._myProfile$;
  }

  // public getUserProfileById(id: string) {
  //   return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`).pipe(
  //     shareReplay(1),
  //     map((res) => res.data)
  //   );
  // }
}
