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
  private _myUsername: string = 'davidtn';
  private _myProfile$!: Observable<User>;

  constructor(private http: HttpClient) {
    this._myProfile$ = this.getUserProfileByUsername(this._myUsername);
  }

  public get username() {
    return this._myUsername;
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
      .pipe(map((res) => res.data));
  }
}
