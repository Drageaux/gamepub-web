import { HttpClient } from '@angular/common/http';
import { AsyncSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@services/api-response';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  apiUrl = environment.apiUrl;

  // TODO: use dynamic user ID and implement login

  constructor(private http: HttpClient) {}

  // public getUserProfileById(id: string) {
  //   return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`).pipe(
  //     shareReplay(1),
  //     map((res) => res.data)
  //   );
  // }

  public getUserProfileByUsername(username: string) {
    if (!username) throw new Error('No username provided');
    return this.http
      .get<ApiResponse<User>>(`${this.apiUrl}/users/${username}`)
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  /*************************************************************************/
  /********************************* ADMIN *********************************/
  /*************************************************************************/
  /**
   * Get all users with username starting with d-
   * @returns
   */
  public getTestUsers() {
    const encodeQuery = encodeURI('username:d-');
    return this.http
      .get<ApiResponse<User[]>>(`${this.apiUrl}/users?q=${encodeQuery}*`)
      .pipe(map((res) => res.data));
  }

  public createUser(username: string, password: string) {
    return this.http
      .post<ApiResponse<User>>(`${this.apiUrl}/users`, {
        username,
        password,
        email: username + '@gmail.com',
      })
      .pipe(map((res) => res.data));
  }
}
