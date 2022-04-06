import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Job } from '@classes/job';
import { Project } from '@classes/project';
import { JobsRoutesNames, ProjectsRoutesNames } from '@classes/routes.names';
import { JobsApiService } from '@services/jobs-api.service';
import { noWhitespaceValidator } from '@utils/no-whitespace.validator';
import { SubSink } from 'subsink';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  jobForm = new FormGroup({
    title: new FormControl('', [
      noWhitespaceValidator,
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    body: new FormControl(''),
  });
  @ViewChild('form') form!: NgForm;

  projectsLink = `${ProjectsRoutesNames.ROOT}`;
  jobsLink = `${JobsRoutesNames.JOBS}`;

  get title() {
    return this.jobForm.get('title');
  }

  get body() {
    return this.jobForm.get('body');
  }

  constructor(
    private jobApi: JobsApiService,
    private projectService: ProjectsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const username = this.projectService.username;
    const projectname = this.projectService.projectname;

    const { title, body } = this.jobForm.value;
    this.subs.sink = this.jobApi
      .createJob(username, projectname, { title, body })
      .subscribe(
        (res: Job) => {
          if (res) {
            // keep the navigation requirements at a minimum
            // reuse username and projectname so the backend query doesn't need to populate
            this.router.navigate([
              username,
              this.projectsLink,
              projectname,
              this.jobsLink,
              res.jobNumber,
            ]);
          } else {
            // resetForm also resets the submitted status, while reset() doesn't
            this.form.resetForm(this.jobForm.value);
            console.error({ project: res });
          }
        },
        (err) => {
          // resetForm also resets the submitted status, while reset() doesn't
          this.form.resetForm(this.jobForm.value);
          console.error(err);
        }
      );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
