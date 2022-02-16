import { HttpClient } from '@angular/common/http';
import { AsyncSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '@classes/user';
import { ApiResponse } from '@services/api-response';
import { map, shareReplay } from 'rxjs/operators';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api/users';
  // TODO: use dynamic user ID and implement login
  private _myUsername: string = 'davidtn';
  private _myProfile$!: Observable<User>;

  constructor(private http: HttpClient, private userApi: UserApiService) {
    this._myProfile$ = this.userApi.getUserProfileByUsername(this._myUsername);
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
}
