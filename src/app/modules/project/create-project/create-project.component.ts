import { User } from '@classes/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from '@classes/project';
import { ProjectService } from '@services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  projectForm = new FormGroup({
    projectName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    githubRepo: new FormControl(''),
  });
  @ViewChild('form') form!: NgForm;

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {}

  get projectName() {
    return this.projectForm.get('projectName');
  }

  onSubmit() {
    const { projectName, githubRepo } = this.projectForm.value;

    this.projectService
      .createProject(projectName.trim(), githubRepo.trim())
      .subscribe(
        (res: Project) => {
          console.log(res);
          if (!res.creator || res.creator instanceof String) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate([
              `/${(res.creator as User).username}/project/${res.displayName}`,
            ]);
          }
        },
        (err) => {
          // resetForm also resets the submitted status, while reset() doesn't
          this.form.resetForm({ projectName, githubRepo });
          console.error(err);
        }
      );
  }
}
