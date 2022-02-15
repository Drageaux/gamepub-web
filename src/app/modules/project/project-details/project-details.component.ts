import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubContents } from '@classes/github-contents';
import { UnityManifest } from '@classes/unity-manifest';
import { ProjectApiService } from '@services/project-api.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  username!: string;
  projName!: string;

  githubContents$!: Observable<GithubContents[] | null>;
  manifest$!: Observable<UnityManifest | null>;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private projectApi: ProjectApiService
  ) {}

  ngOnInit(): void {
    // TODO: navigate off if not found

    // TODO: optimize these to reuse the requested project
    this.githubContents$ = this.projectService
      .getProject()
      .pipe(
        switchMap((proj) =>
          proj && proj.githubRepo
            ? this.projectApi.loadRepoTree(proj.githubRepo)
            : of(null)
        )
      );

    this.manifest$ = this.projectService
      .getProject()
      .pipe(
        switchMap((proj) =>
          proj && proj.githubRepo
            ? this.projectApi.getManifest(proj.githubRepo)
            : of(null)
        )
      );
  }
}
