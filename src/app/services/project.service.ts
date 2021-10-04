import { GithubRepo } from './../classes/github-repo';
import { GithubContents } from './../classes/github-contents';
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

  constructor(private http: HttpClient) {}

  loadRepoTree(owner: string, repo: string) {
    return this.http.get<GithubContents[]>(
      `https://api.github.com/repos/${owner}/${repo}/contents`
    );
  }

  // TODO: parse project structure
  projectBuilder(name: string = 'New Project'): Project {
    const proj: Project = {
      name,
    };
    return proj;
  }

  parseManifest(manifest: UnityManifest) {
    // if (proj.default_branch) {
    // `https://api.github.com/repos/${owner}/${repo}/git/trees/${proj['default_branch']}/root?recursive=0`
    // } else return throwError('Cannot find default branch of project!');
    let unityRegistryPkgs = manifest.dependencies;
    console.log(unityRegistryPkgs);
    return;
  }

  getManifest(owner: string, repo: string) {
    // NOTE: Packages or UnityPackageManager folder
    // TODO: Sometimes the file may be in a different location, so we should support custom path later
    return this.http.get<UnityManifest>(
      `https://api.github.com/repos/${owner}/${repo}/contents/Packages/manifest.json`
    );
    // return this.http.get<UnityManifest>('./assets/test-data/manifest.json');
    // .subscribe((res) => {
    //   for (const [k, v] of Object.entries(res.dependencies)) {
    //     console.log(k, v);
    //   }
    // });
  }
}
