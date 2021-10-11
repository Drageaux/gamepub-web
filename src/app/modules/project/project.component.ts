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

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  owner = 'OpenHogwarts';
  repo = 'hogwarts';

  projContents$: Observable<GithubContents[]>;
  packageManifest$: Observable<UnityManifest>;

  constructor(private projService: ProjectService) {
    this.projContents$ = this.projService
      .loadRepoTree('OpenHogwarts', 'hogwarts')
      .pipe(tap(console.log));

    this.packageManifest$ = this.projService.getManifest(this.owner, this.repo);
  }

  ngOnInit(): void {}

  isOpenUpmRegistry(registry: ScopedRegistry) {
    return registry.url === 'https://package.openupm.com';
  }

  trimPackageList(pkgs: PackageName[]) {
    return pkgs.filter((x) => EXCLUDED_PACKAGES.indexOf(x) == -1);
  }
}
