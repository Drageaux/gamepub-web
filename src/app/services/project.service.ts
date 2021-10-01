import { Injectable } from '@angular/core';
import data from './test-data/manifest.json';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor() {}

  // TODO: parse project structure

  parseManifest() {}
}
