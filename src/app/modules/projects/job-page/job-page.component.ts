import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from '@classes/job';
import { JobComment } from '@classes/job-comment';
import { JobSubmission } from '@classes/job-submission';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { JobsApiService } from '@services/jobs-api.service';
import { UsersService } from '@services/users.service';
import { SubSink } from 'subsink';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss'],
})
export class JobPageComponent implements OnInit {
  private subs = new SubSink();
  private _creator!: string;
  private _projectname!: string;
  private _jobnumber!: number | string;

  newJobLink = ProjectsRoutesNames.NEWJOB;
  jobParamName = ProjectsRoutesNames.JOBPARAMNAME;
  submissionsLink = ProjectsRoutesNames.JOBSUBMISSIONS;
  submissionParamName = ProjectsRoutesNames.JOBSUBMISSIONPARAMNAME;

  currUsername = '';
  job!: Job;
  comments!: JobComment[];
  submissions!: JobSubmission[];
  submissionsLimit = 5;

  get creator() {
    return this._creator;
  }

  get projectName() {
    return this._projectname;
  }

  get jobNumber() {
    return this._jobnumber;
  }

  constructor(
    private route: ActivatedRoute,
    private jobsApi: JobsApiService,
    private projectsService: ProjectsService,
    private usersService: UsersService,
    public ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._creator = this.projectsService.username;
    this._projectname = this.projectsService.projectname;
    this._jobnumber = parseInt(this.route.snapshot.params[this.jobParamName]);

    this.subs.sink = this.jobsApi
      .getJobByJobNumber(this._creator, this._projectname, this._jobnumber)
      .subscribe((job) => {
        this.job = job;
        this.ref.markForCheck();
      });

    this.subs.sink = this.jobsApi
      .getJobSubmissions(this._creator, this._projectname, this._jobnumber)
      .subscribe((submissions) => {
        this.submissions = submissions.sort(
          (a, b) => (a.submissionNumber || 0) - (b?.submissionNumber || 0)
        );
        this.ref.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
