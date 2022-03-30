import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss'],
})
export class CreateAssetComponent implements OnInit {
  private subs = new SubSink();
  projectsLink = ProjectsRoutesNames.ROOT;

  assetForm = new FormGroup({
    githubRepo: new FormControl(''),
  });
  @ViewChild('form') form!: NgForm;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {}
}
