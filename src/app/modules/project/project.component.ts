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
  skip,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { SubSink } from 'subsink';
import { Job } from '@classes/job';
import { JobApiService } from '@services/job-api.service';
import { ProjectService } from './project.service';
import { ProfileRoutesNames, ProjectsRoutesNames } from '@classes/routes.names';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProjectService],
})
export class ProjectComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  projectsLink = `${ProjectsRoutesNames.ROOT}`;
  detailsLink = `${ProjectsRoutesNames.DETAILS}`;
  jobsLink = `${ProjectsRoutesNames.JOBS}`;
  userParamName = `${ProfileRoutesNames.PROFILEPARAMNAME}`;
  projectParamName = `${ProjectsRoutesNames.PROJECTPARAMNAME}`;

  username!: string;
  project!: Project | null;

  readonly noProjectError$ = new Subject<boolean>();

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.route.params.subscribe((params) => {
      if (params[this.userParamName] || params[this.projectParamName]) {
        this.username = params[this.userParamName];
        this.projectService.changeProject(
          params[this.userParamName],
          params[this.projectParamName]
        );
        this.ref.markForCheck();
      }
    });

    this.subs.sink = this.noProjectError$.subscribe((hasError) => {
      if (hasError) this.router.navigate(['', this.username]);
    });

    this.subs.sink = this.projectService.getProject().subscribe((proj) => {
      if (proj) {
        this.project = proj;
        this.ref.markForCheck();
      } else this.noProjectError$.next(true);
    });
  }

  // unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
