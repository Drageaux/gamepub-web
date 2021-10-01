import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  apiUrl = 'https://api.openupm.com';
  allPackagesUrl = '/packages/extra';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.apiUrl}${this.allPackagesUrl}`);
  }
}
