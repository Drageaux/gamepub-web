import { RegistryScope } from './../classes/scoped-registry';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { Package } from '../classes/package';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  // openUpmApiUrl = 'https://api.openupm.com/packages';
  // openUpmPackagesUrl = 'https://package.openupm.com';
  openUpmPackagesUrl = '/registry/openupm';
  allPackagesUrl = '/packages/extra';

  constructor(private http: HttpClient) {}

  // getAll() {
  //   return this.http
  //     .get<Map<PackageName, Package>>(
  //       `${this.openUpmApiUrl}${this.allPackagesUrl}`
  //     )
  //     .pipe(map((val) => val));
  // }

  expandOpenUpmPackageInfo(scope: RegistryScope): Observable<Package> {
    console.log(scope);
    return this.http
      .get<Package>(`${this.openUpmPackagesUrl}/${scope}`)
      .pipe(tap(console.log), shareReplay());
  }
}
