import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubContents } from '@classes/github-contents';
import { UnityManifest } from '@classes/unity-manifest';
import { ProjectsApiService } from '@services/projects-api.service';
import { Observable, of, ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  githubRepo$ = new ReplaySubject<string>(1);
  username!: string;
  projName!: string;

  githubContents$!: Observable<GithubContents[] | null>;
  manifest$!: Observable<UnityManifest | null>;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public projectPageService: ProjectsService,
    private projectApi: ProjectsApiService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.githubContents$ = this.projectService.getProject().pipe(
    //   switchMap((proj) =>
    //     proj && proj.githubRepo
    //       ? this.projectApi.loadRepoTree(proj.githubRepo)
    //       : of(null)
    //   )
    // );

    this.subs.sink = this.projectPageService.getProject().subscribe((proj) => {
      this.githubRepo$.next(proj?.githubRepo || '');
      this.ref.markForCheck();
    });

    this.manifest$ = this.githubRepo$.pipe(
      switchMap((ghRepo) =>
        ghRepo ? this.projectApi.getManifest(ghRepo) : of(null)
      )
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
