import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Package } from '../classes/package';

type PackageName = string;

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  apiUrl = 'https://api.openupm.com';
  allPackagesUrl = '/packages/extra';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<Map<PackageName, Package>>(`${this.apiUrl}${this.allPackagesUrl}`)
      .pipe(map((val) => val));
  }
}
