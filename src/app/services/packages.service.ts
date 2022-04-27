import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Package, PackageName } from '@classes/package';
import { RegistryScope } from '@classes/scoped-registry';
import { environment } from 'src/environments/environment';
import { ApiResponse } from './api-response';

@Injectable({ providedIn: 'root' })
export class PackagesService {
  apiUrl = environment.apiUrl;
  // openUpmApiUrl = 'https://api.openupm.com/packages';
  unityPackagesUrl = 'packages/unity';
  openUpmPackagesUrl = 'packages/openupm';
  // openUpmPackagesUrl = '/registry/openupm';
  allPackagesUrl = '/packages/extra';

  constructor(private http: HttpClient) {}

  // getAll() {
  //   return this.http
  //     .get<Map<PackageName, Package>>(
  //       `${this.openUpmApiUrl}${this.allPackagesUrl}`
  //     )
  //     .pipe(map((val) => val));
  // }

  expandUnityRegistryPackageInfo(name: PackageName): Observable<Package> {
    return this.http
      .get<ApiResponse<Package>>(
        `${this.apiUrl}/${this.unityPackagesUrl}/${name}`
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }

  expandOpenUpmPackageInfo(scope: RegistryScope): Observable<Package> {
    return this.http
      .get<ApiResponse<Package>>(
        `${this.apiUrl}/${this.openUpmPackagesUrl}/${scope}`
      )
      .pipe(
        shareReplay(1),
        map((res) => res.data)
      );
  }
}
