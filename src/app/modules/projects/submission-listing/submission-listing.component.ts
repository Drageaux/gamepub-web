import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobSubmission } from '@classes/job-submission';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { JobsApiService } from '@services/jobs-api.service';
import { Subject } from 'rxjs';
import { tap, withLatestFrom, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { JobPageService } from '../job-page.service';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-submission-listing',
  templateUrl: './submission-listing.component.html',
  styleUrls: ['./submission-listing.component.scss'],
})
export class SubmissionListingComponent implements OnInit {
  private subs = new SubSink();

  submissionsLink = ProjectsRoutesNames.JOBSUBMISSIONS;
  submissionParamName = ProjectsRoutesNames.JOBSUBMISSIONPARAMNAME;

  submissions!: JobSubmission[];

  readonly noJobError$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private jobsApi: JobsApiService,
    private projectsService: ProjectsService,
    private jobPageService: JobPageService,
    public ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // handle error
    this.subs.sink = this.noJobError$.subscribe((hasError) => {
      if (hasError) this.router.navigate(['../../']);
    });

    this.subs.sink = this.jobPageService
      .getJob()
      .pipe(
        withLatestFrom(this.projectsService.getProject()),
        switchMap(([job, project]) => {
          if (!project || !job || !job?.jobNumber) {
            this.noJobError$.next(true);
            throw new Error('Cannot parse job');
          } else {
            return this.jobsApi.getJobSubmissions(
              project.creator,
              project.name,
              job.jobNumber
            );
          }
        })
      )
      .subscribe((submissions) => {
        this.submissions = submissions.sort(
          (a, b) => (a.submissionNumber || 0) - (b?.submissionNumber || 0)
        );
        this.ref.markForCheck();
      });
  }
}
