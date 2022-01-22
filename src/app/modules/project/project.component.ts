import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { GithubContents } from '@classes/github-contents';
import { ProjectService } from '@services/project.service';
import { UnityManifest } from '@classes/unity-manifest';
import { Project } from '@classes/project';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projName!: string;
  project$!: Observable<Project>;
  tab: 'Overview' | 'Details' | 'Jobs' | 'World' = 'Overview';

  githubContents$!: Observable<GithubContents[] | null>;
  manifest$!: Observable<UnityManifest | null>;

  constructor(
    public route: ActivatedRoute,
    private projService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projName = this.route.snapshot.paramMap.get('') || '';

    if (this.projName == '') {
      // TODO: navigate back to homepage or a display proper message
    }

    this.project$ = this.projService.getProject(this.projName);
    this.githubContents$ = this.project$.pipe(
      take(1),
      switchMap((proj) =>
        proj.githubRepo
          ? this.projService.loadRepoTree(proj.githubRepo)
          : of(null)
      )
    );
    this.manifest$ = this.project$.pipe(
      take(1),
      switchMap((proj) =>
        proj.githubRepo
          ? this.projService.getManifest(proj.githubRepo)
          : of(null)
      )
    );
    // from project, pull GitHub repo contents to render packages included}
  }
}
