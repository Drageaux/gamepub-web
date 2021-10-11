import { ScopedRegistry } from './../../classes/scoped-registry';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { GithubContents } from './../../classes/github-contents';
import { ProjectService } from 'src/app/services/project.service';
import { UnityManifest } from 'src/app/classes/unity-manifest';
import { PackageService } from 'src/app/services/package.service';
import { PackageName } from 'src/app/classes/package';
import { EXCLUDED_PACKAGES } from 'src/app/classes/CONSTANTS';
import { Project } from 'src/app/classes/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  project$: Observable<Project>;
  projContents$!: Observable<GithubContents[]>;
  packageManifest$!: Observable<UnityManifest>;

  constructor(private projService: ProjectService) {
    // TODO: pull an actual project from the database, requires project uid
    this.project$ = this.projService.getProject('1');
    // from project, pull GitHub repo contents to render packages included

    // if (proj.ownerName && proj.repoName) {
    //   this.packageManifest$ = this.projService.getManifest(
    //     proj.ownerName,
    //     proj.repoName,
    //     'Packages'
    //   );
  }

  ngOnInit(): void {}
}
