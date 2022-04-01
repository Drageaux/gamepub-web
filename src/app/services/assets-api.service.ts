import { ApiResponse } from '@services/api-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UsersService } from './users.service';

import { UsersApiService } from './users-api.service';
import { environment } from 'src/environments/environment';
import { Asset } from '@classes/asset';

@Injectable({
  providedIn: 'root',
})
export class AssetsApiService {
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
  getAssetByPuid(puid: string): Observable<Asset> {
    return this.http
      .get<ApiResponse<Asset>>(`${this.apiUrl}/assets/${puid}`)
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  getAssetsByUsername(username: string): Observable<Asset[]> {
    return this.http
      .get<ApiResponse<Asset[]>>(`${this.apiUrl}/users/${username}/assets`)
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  getAllPublicAssets(): Observable<Asset[]> {
    return this.http.get<ApiResponse<Asset[]>>(`${this.apiUrl}/assets`).pipe(
      shareReplay(1),
      map((res) => res.data)
    );
  }

  create(asset: Asset): Observable<Asset> {
    let body = { ...asset };
    return this.http
      .post<ApiResponse<Asset>>(`${this.apiUrl}/assets`, body)
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }
}
