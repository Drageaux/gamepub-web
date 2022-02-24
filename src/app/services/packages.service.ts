import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { Package } from '@classes/package';
import { RegistryScope } from '@classes/scoped-registry';

@Injectable()
export class PackagesService {
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
