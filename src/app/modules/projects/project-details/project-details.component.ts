import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubContents } from '@classes/github-contents';
import { UnityManifest } from '@classes/unity-manifest';
import { ProjectsApiService } from '@services/projects-api.service';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  githubRepo = '';
  username!: string;
  projName!: string;

  githubContents$!: Observable<GithubContents[] | null>;
  manifest$!: Observable<UnityManifest | null>;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectsService,
    private projectApi: ProjectsApiService
  ) {}

  ngOnInit(): void {
    this.githubContents$ = this.projectService.getProject().pipe(
      tap((proj) => {
        this.githubRepo = proj?.githubRepo || '';
        return proj;
      }),
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
