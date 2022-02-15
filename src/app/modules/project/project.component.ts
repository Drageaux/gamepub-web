import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { combineLatest, Observable, of, ReplaySubject, Subject } from 'rxjs';

import { GithubContents } from '@classes/github-contents';
import { ProjectApiService } from '@services/project-api.service';
import { UnityManifest } from '@classes/unity-manifest';
import { Project } from '@classes/project';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catchError,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { SubSink } from 'subsink';
import { Job } from '@classes/job';
import { JobApiService } from '@services/job-api.service';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProjectService],
})
export class ProjectComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  username!: string;
  projName!: string;

  project!: Project | null;
  jobs$!: Observable<Job[] | null>;

  readonly noProjectError$ = new Subject<boolean>();

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private projectApi: ProjectApiService,
    private jobApi: JobApiService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.projName = this.route.snapshot.paramMap.get('projectname') || '';
    // this.username = this.route.snapshot.paramMap.get('username') || '';

    this.route.params.subscribe((params) => {
      console.log('bruh');
      if (params['projectname'] || params['username']) {
        this.projectService.changeProject(
          params['username'],
          params['projectname']
        );
        this.ref.markForCheck();
      }
    });

    this.projectService.getProject().subscribe((proj) => {
      if (proj) {
        this.project = proj;
        this.ref.markForCheck();
      } else this.noProjectError$.next(true);
    });

    // if (this.username === '') {
    //   console.log('no username');
    //   this.router.navigate(['/']);
    // }
    // if (this.projName === '') {
    //   console.log('no project name');
    //   // TODO: navigate back to homepage or a display proper message
    //   this.router.navigate(['/' + this.username]);
    // }

    this.subs.sink = this.noProjectError$.subscribe((hasError) => {
      if (hasError) this.router.navigate(['', this.username]);
    });

    // service retrieves once
    // this.subs.sink = this.projectApi
    //   .getProjectByFullPath(this.username, this.projName)
    //   .pipe(
    //     shareReplay(1),
    //     map((project) => {
    //       if (project) return project;
    //       else throw new Error('No project found');
    //     }),
    //     catchError((err) => {
    //       console.error(err);
    //       this.noProjectError$.next(true);
    //       return of(null);
    //     })
    //   )
    //   .subscribe((proj) => {
    //     // observable/subject project emits first data
    //     // if (proj) this.project$.next(proj);
    //   });

    // this.githubContents$ = this.project$.pipe(
    //   switchMap((proj) =>
    //     proj && proj.githubRepo
    //       ? this.projService.loadRepoTree(proj.githubRepo)
    //       : of(null)
    //   )
    // );
    // this.manifest$ = this.project$.pipe(
    //   switchMap((proj) =>
    //     proj && proj.githubRepo
    //       ? this.projService.getManifest(proj.githubRepo)
    //       : of(null)
    //   )
    // );
  }

  onProjectChange(proj: Project) {
    // this.project$.next(proj);
  }

  // unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
