import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobSubmission } from '@classes/job-submission';
import { JobsRoutesNames, ProjectsRoutesNames } from '@classes/routes.names';
import { JobsApiService } from '@services/jobs-api.service';
import { noWhitespaceValidator } from '@utils/no-whitespace.validator';
import { SubSink } from 'subsink';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-submit-job',
  templateUrl: './submit-job.component.html',
  styleUrls: ['./submit-job.component.scss'],
})
export class SubmitJobComponent implements OnInit {
  /*************************************************************************/
  /********************************** VARS *********************************/
  /*************************************************************************/
  private subs = new SubSink();
  jobSubmissionForm = new FormGroup({
    githubRepo: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.maxLength(400)]),
  });
  @ViewChild('form') form!: NgForm;

  projectsLink = `${ProjectsRoutesNames.ROOT}`;
  jobsLink = `${ProjectsRoutesNames.JOBS}`;
  jobParamName = ProjectsRoutesNames.JOBPARAMNAME;
  submissionsLink = ProjectsRoutesNames.JOBSUBMISSIONPARAM;
  private username!: string;
  private projectname!: string;
  private jobnumber!: number | string;

  /*************************************************************************/
  /******************************** GETTERS ********************************/
  /*************************************************************************/
  get githubRepo() {
    return this.jobSubmissionForm.get('githubRepo');
  }

  get body() {
    return this.jobSubmissionForm.get('body');
  }

  constructor(
    private route: ActivatedRoute,
    private jobsApi: JobsApiService,
    private projectService: ProjectsService,
    private router: Router
  ) {
    this.username = this.projectService.username;
    this.projectname = this.projectService.projectname;
    this.jobnumber = parseInt(this.route.snapshot.params[this.jobParamName]);
  }

  ngOnInit(): void {}

  onSubmit() {
    const username = this.projectService.username;
    const projectname = this.projectService.projectname;

    const { githubRepo, body } = this.jobSubmissionForm.value;
    this.subs.sink = this.jobsApi
      .postJobSubmission(username, projectname, this.jobnumber, {
        githubRepo: githubRepo.trim(),
        body: body.trim(),
      } as JobSubmission)
      .subscribe(
        (res: JobSubmission) => {
          if (res) {
            // keep the navigation requirements at a minimum);
            // reuse username and projectname so the backend query doesn't need to populate
            this.router.navigate([
              username,
              this.projectsLink,
              projectname,
              this.jobsLink,
              this.jobnumber,
              this.submissionsLink,
              res.submissionNumber,
            ]);
          } else {
            // resetForm also resets the submitted status, while reset() doesn't
            this.form.resetForm(this.jobSubmissionForm.value);
          }
        },
        (err) => {
          // resetForm also resets the submitted status, while reset() doesn't
          this.form.resetForm(this.jobSubmissionForm.value);
          console.error(err);
        }
      );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
