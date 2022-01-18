import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { GithubContents } from '@classes/github-contents';
import { ProjectService } from '@services/project.service';
import { UnityManifest } from '@classes/unity-manifest';
import { Project } from '@classes/project';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projId!: string | null;
  project$!: Observable<Project>;
  tab: 'Overview' | 'Details' | 'Jobs' | 'World' = 'Overview';

  githubContents$!: Observable<GithubContents[] | null>;

  constructor(
    public route: ActivatedRoute,
    private projService: ProjectService
  ) {}

  ngOnInit(): void {
    // TODO: pull an actual project from the database, requires project uid
    this.projId = this.route.snapshot.paramMap.get('id');
    console.log(this.projId);
    this.project$ = this.projService.getProject(this.projId!);
    this.githubContents$ = this.project$.pipe(
      switchMap((proj) =>
        proj.githubProject
          ? this.projService.loadRepoTree(proj.githubProject)
          : of(null)
      )
    );
    // from project, pull GitHub repo contents to render packages included}
  }
}
