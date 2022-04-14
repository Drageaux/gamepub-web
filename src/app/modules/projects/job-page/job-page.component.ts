import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '@classes/job';
import { JobComment } from '@classes/job-comment';
import { JobSubmission } from '@classes/job-submission';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { JobsApiService } from '@services/jobs-api.service';
import { UsersService } from '@services/users.service';
import { Subject } from 'rxjs';
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

  readonly noJobError$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobsApi: JobsApiService,
    private projectsService: ProjectsService,
    private jobPageService: JobPageService,
    private usersService: UsersService,
    public ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // handle error
    this.subs.sink = this.noJobError$.subscribe((hasError) => {
      if (hasError) this.router.navigate(['../']);
    });

    this.subs.sink = this.route.params.subscribe((params) => {
      if (params[this.jobParamName]) {
        this.jobPageService.changeJob(parseInt(params[this.jobParamName]));
        this.ref.markForCheck();
      } else {
        // missing username or project name or job nubmer
        this.noJobError$.next(true);
      }
    });

    this.subs.sink = this.jobPageService.getJob().subscribe(
      (job) => {
        if (job) {
          this.job = job;
          this.ref.markForCheck();
        } else this.noJobError$.next(true);
      },
      (err) => this.noJobError$.next(true)
    );

    // this.subs.sink = this.jobsApi
    //   .getJobSubmissions(this._creator, this._projectname, this._jobnumber)
    //   .subscribe((submissions) => {
    //     this.submissions = submissions.sort(
    //       (a, b) => (a.submissionNumber || 0) - (b?.submissionNumber || 0)
    //     );
    //     this.ref.markForCheck();
    //   });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
