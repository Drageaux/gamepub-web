import { User } from '@classes/user';
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
import { Project } from '@classes/project';
import { ProjectsApiService } from '@services/projects-api.service';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  projectForm = new FormGroup({
    formattedName: new FormControl(
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      [this.validateUniqueProjectName.bind(this)]
    ),
    displayName: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    githubRepo: new FormControl(''),
  });
  @ViewChild('form') form!: NgForm;

  get displayName() {
    return this.projectForm.get('displayName');
  }

  get formattedName() {
    return this.projectForm.get('formattedName');
  }

  constructor(private projectApi: ProjectsApiService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const { formattedName, displayName, githubRepo } = this.projectForm.value;

    this.subs.sink = this.projectApi
      .createProject({
        name: formattedName.trim(),
        displayName: displayName.trim() || '',
        githubRepo: githubRepo.trim(),
      } as Project)
      .subscribe(
        (res: Project) => {
          console.log(res);
          if (!res?.creator || res?.creator instanceof String) {
            // TODO: needs testing
            this.router.navigate(['project', res._id]);
          } else {
            this.router.navigate([
              '',
              (res.creator as User).username,
              'project',
              res.name,
            ]);
          }
        },
        (err) => {
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
