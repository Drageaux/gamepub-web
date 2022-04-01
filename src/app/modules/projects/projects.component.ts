import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { combineLatest, Observable, of, ReplaySubject, Subject } from 'rxjs';

import { GithubContents } from '@classes/github-contents';
import { ProjectsApiService } from '@services/projects-api.service';
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
import { JobsApiService } from '@services/jobs-api.service';
import { ProjectsService } from './projects.service';
import { ProfileRoutesNames, ProjectsRoutesNames } from '@classes/routes.names';

/**
 * Main page for a single Project.
 */
@Component({
  selector: 'app-project',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProjectsService],
})
export class ProjectsComponent implements OnInit, OnDestroy {
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
    private projectsService: ProjectsService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // handle error
    this.subs.sink = this.noProjectError$.subscribe((hasError) => {
      if (hasError) this.router.navigate(['', this.username]);
    });

    // watch route change
    this.subs.sink = this.route.params.subscribe((params) => {
      if (params[this.userParamName] && params[this.projectParamName]) {
        this.username = params[this.userParamName];
        this.projectsService.changeProject(
          params[this.userParamName],
          params[this.projectParamName]
        );
        this.ref.markForCheck();
      } else {
        // missing username or project name
        this.noProjectError$.next(true);
      }
    });

    this.subs.sink = this.projectsService.getProject().subscribe(
      (proj) => {
        if (proj) {
          this.project = proj;
          this.ref.markForCheck();
        } else this.noProjectError$.next(true);
      },
      (err) => this.noProjectError$.next(true)
    );
  }

  // unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
