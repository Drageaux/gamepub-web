import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  newProjectForm = new FormGroup({
    projectName: new FormControl(''),
    githubRepo: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}
}
