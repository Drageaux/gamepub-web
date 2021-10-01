import { Injectable } from '@angular/core';
import { UnityManifest } from '../classes/unity-manifest';
import testData from './test-data/manifest.json';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  data: UnityManifest = testData;
  constructor() {
    console.log(this.data);
    this.parseManifest(this.data);
  }

  // TODO: parse project structure

  parseManifest(manifest: UnityManifest) {}
}
