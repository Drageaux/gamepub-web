import { HttpClient } from '@angular/common/http';
import { AsyncSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '@classes/user';
import { ApiResponse } from '@services/api-response';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private apiUrl = '/api/users';
  // TODO: use dynamic user ID and implement login

  constructor(private http: HttpClient) {}

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
