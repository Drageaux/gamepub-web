import { HttpClient } from '@angular/common/http';
import { AsyncSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '@classes/user';
import { ApiResponse } from '@services/api-response';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api/users';
  // TODO: use dynamic user ID and implement login
  private _username: string = 'davidtn';
  private _profile$!: Observable<User>;

  constructor(private http: HttpClient) {
    this._profile$ = this.getUserProfileByUsername(this._username);
  }

  public get username() {
    return this._username;
  }

  public get profile$() {
    return this._profile$;
  }

  // public getUserProfileById(id: string) {
  //   return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`).pipe(
  //     shareReplay(1),
  //     map((res) => res.data)
  //   );
  // }

  public getUserProfileByUsername(username: string) {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${username}`).pipe(
      shareReplay(1),
      map((res) => res.data)
    );
  }

  // TODO: secure this function
  public createUser(username: string, password: string) {
    return this.http
      .post<ApiResponse<User>>(`${this.apiUrl}`, {
        username,
        password,
        email: username + '@gmail.com',
      })
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }
}
