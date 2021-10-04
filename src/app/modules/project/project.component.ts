import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { GithubContents } from './../../classes/github-contents';
import { ProjectService } from 'src/app/services/project.service';
import { UnityManifest } from 'src/app/classes/unity-manifest';

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
}
