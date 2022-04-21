import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '@classes/job';
import { JobComment } from '@classes/job-comment';
import { JobSubmission } from '@classes/job-submission';
import { Project } from '@classes/project';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { JobsApiService } from '@services/jobs-api.service';
import { UsersService } from '@services/users.service';
import { Subject, forkJoin, of } from 'rxjs';
import { tap, withLatestFrom, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { JobPageService } from '../job-page.service';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss'],
})
export class JobPageComponent implements OnInit {
  private subs = new SubSink();

  newJobLink = ProjectsRoutesNames.NEWJOB;
  jobParamName = ProjectsRoutesNames.JOBPARAMNAME;
  submissionsLink = ProjectsRoutesNames.JOBSUBMISSIONS;
  submissionParamName = ProjectsRoutesNames.JOBSUBMISSIONPARAMNAME;

  currUsername = '';
  job!: Job;
  comments!: JobComment[];
  submissions!: JobSubmission[];
  submissionsLimit = 5;
  descriptionLimit = 40;

  get Math() {
    return Math;
  }

  readonly noJobError$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobsApi: JobsApiService,
    public projectsService: ProjectsService,
    public usersService: UsersService,
    private jobPageService: JobPageService,
    public ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // handle error
    this.subs.sink = this.noJobError$.subscribe((hasError) => {
      if (hasError) this.router.navigate(['../']);
    });

    this.subs.sink = this.route.params
      .pipe(withLatestFrom(this.projectsService.getProject()))
      .subscribe(([params, project]) => {
        if (params[this.jobParamName] && project?.creator && project?.name) {
          this.jobPageService.changeJob(
            project?.creator,
            project?.name,
            parseInt(params[this.jobParamName])
          );
          this.ref.markForCheck();
        } else {
          // missing username or project name or job nubmer
          this.noJobError$.next(true);
        }
      });

    this.subs.sink = this.jobPageService
      .getJob()
      .pipe(
        tap((job) => {
          if (job) {
            this.job = job;
            this.ref.markForCheck();
          } else this.noJobError$.next(true);
          return job;
        }),
        switchMap(() => this.jobPageService.getSubmissions())
      )
      .subscribe((submissions) => {
        this.submissions = submissions;
        this.ref.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.jobPageService.resetJob();
  }
}
