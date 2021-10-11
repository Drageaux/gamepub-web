import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GithubContents } from './../classes/github-contents';
import { UnityManifest } from './../classes/unity-manifest';
import { Project } from './../classes/project';

import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // data = testData;

  constructor(private http: HttpClient) {}

  getProject(uid: string) {
    // TODO: return a project from the database
    // return this.http.get<Project>('/api/project/' + uid)
    return of({
      uid,
      ownerName: 'OpenHogwarts',
      repoName: 'hogwarts',
    } as Project);
  }

  loadRepoTree(owner: string, repo: string) {
    return this.http.get<GithubContents[]>(
      `https://api.github.com/repos/${owner}/${repo}/contents`
    );
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
    // uncomment below for test on custom file
    // return this.http.get<UnityManifest>('./assets/test-data/manifest.json');
  }
}
