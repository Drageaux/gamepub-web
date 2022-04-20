import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@auth0/auth0-angular';
import { Project } from '@classes/project';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { ProjectsApiService } from '@services/projects-api.service';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { noWhitespaceValidator } from 'src/app/utils/no-whitespace.validator';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  projectsLink = ProjectsRoutesNames.ROOT;

  projectForm = new FormGroup({
    formattedName: new FormControl(
      '',
      [
        noWhitespaceValidator,
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ],
      [this.validateUniqueProjectName.bind(this)]
    ),
    displayName: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    githubRepo: new FormControl(''),
  });
  @ViewChild('form') form!: NgForm;

  /*************************************************************************/
  /******************************** GETTERS ********************************/
  /*************************************************************************/
  get displayName() {
    return this.projectForm.get('displayName');
  }

  get formattedName() {
    return this.projectForm.get('formattedName');
  }

  /*************************************************************************/
  /************************** COMPONENT LIFECYCLE **************************/
  /*************************************************************************/
  constructor(private projectApi: ProjectsApiService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /*************************************************************************/
  /********************************** FORM *********************************/
  /*************************************************************************/
  onSubmit() {
    // TODO: catch error when submitted before checkName validator finishes
    const { formattedName, displayName, githubRepo } = this.projectForm.value;

    this.subs.sink = this.projectApi
      .createProject({
        name: formattedName.trim(),
        displayName: displayName.trim() || '',
        githubRepo: githubRepo.trim(),
      } as Project)
      .subscribe(
        (res: Project) => {
          // navigate
          if (res?.creator) {
            this.router.navigate([
              '',
              res.creator,
              this.projectsLink,
              res.name,
            ]);
          } else {
            this.router.navigate([this.projectsLink, res._id]);
          }
        },
        (err) => {
          // TODO: display error after submitting, but reset the submit button
          // resetForm also resets the submitted status, while reset() doesn't
          this.form.resetForm(this.projectForm.value);
          console.error(err);
        }
      );
  }

  validateUniqueProjectName(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return timer(300).pipe(
      switchMap(() =>
        this.projectApi
          .isProjectNameTaken(control.value)
          .pipe(map((isTaken) => (isTaken ? { projectNameTaken: true } : null)))
      )
    );
  }
}
