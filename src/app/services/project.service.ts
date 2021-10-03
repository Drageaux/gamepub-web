import { Package } from './../classes/package';
import { UnityManifest } from './../classes/unity-manifest';
import { Project } from './../classes/project';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // data = testData;
  constructor(private http: HttpClient) {
    // console.log(this.data.dependencies);
    // this.parseManifest(this.data);
    this.getManifest();
  }

  // TODO: parse project structure
  projectBuilder(name: string = 'New Project'): Project {
    const proj: Project = {
      name,
    };
    return proj;
  }

  parseManifest(manifest: UnityManifest) {
    let unityRegistryPkgs = manifest.dependencies;
    console.log(unityRegistryPkgs);
    return;
  }

  getManifest() {
    this.http
      .get<UnityManifest>('./assets/test-data/manifest.json')
      .subscribe((res) => {
        for (const [k, v] of Object.entries(res.dependencies)) {
          console.log(k, v);
        }
      });
  }
}
