import { GithubRepo } from './../classes/github-repo';
import { GithubContents } from './../classes/github-contents';
import { Package } from './../classes/package';
import { UnityManifest } from './../classes/unity-manifest';
import { Project } from './../classes/project';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, mergeMap, map, tap, catchError } from 'rxjs/operators';
import { of, throwError, Observable } from 'rxjs';

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
    return unityRegistryPkgs;
  }

  getManifest(
    owner: string,
    repo: string,
    path: string = 'Packages'
  ): Observable<UnityManifest> {
    // TODO: Sometimes the file may be in a different location, so we should support custom path later
    // NOTE: Packages or UnityPackageManager folder
    return this.http
      .get<GithubContents>(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}/manifest.json`
      )
      .pipe(
        switchMap((res) => {
          // file type from this API endpoint has base64 encoded content
          if (res.type === 'file' && res.content) {
            const decoded = atob(res.content);
            return of(JSON.parse(decoded) as UnityManifest);
          } else throw new Error('Not a valid file');
        }),
        // throw and catch error https://www.tektutorialshub.com/angular/using-throwerror-in-angular-observable/
        catchError((err) => {
          console.error(err);
          return throwError(err);
        })
      );
    // delete below for test on custom file
    // return this.http.get<UnityManifest>('./assets/test-data/manifest.json');
    // .subscribe((res) => {
    //   for (const [k, v] of Object.entries(res.dependencies)) {
    //     console.log(k, v);
    //   }
    // });
  }
}
