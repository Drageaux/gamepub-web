import { Package } from './../classes/package';
import { UnityManifest } from './../classes/unity-manifest';
import { Project } from './../classes/project';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // data = testData;
  constructor(private http: HttpClient) {
    const owner = 'OpenHogwarts';
    const repo = 'hogwarts';
    this.loadRepoTree(owner, repo);
  }

  loadRepoTree(owner: string, repo: string) {
    this.http
      .get(`https://api.github.com/repos/${owner}/${repo}`)
      .pipe(
        mergeMap((proj: any) => {
          console.log('proj:', proj);
          if (proj?.hasOwnProperty('default_branch')) {
            return this.http.get(
              `https://api.github.com/repos/${owner}/${repo}/git/trees/${proj['default_branch']}?recursive=0`
            );
          } else return throwError('Cannot find default_branch of project!');
        })
      )
      .subscribe(console.log, console.error);
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
    // NOTE: Packages or UnityPackageManager folder
    // TODO: Sometimes the file may be in a different location, so we should support custom path later
    // return this.http.get(
    //   `https://api.github.com/repos/${owner}/${repo}/contents/Packages/manifest.json`
    this.http
      .get<UnityManifest>('./assets/test-data/manifest.json')
      .subscribe((res) => {
        for (const [k, v] of Object.entries(res.dependencies)) {
          console.log(k, v);
        }
      });
  }
}
