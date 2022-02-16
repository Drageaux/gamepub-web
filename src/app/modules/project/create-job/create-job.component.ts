import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { JobApiService } from '@services/job-api.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent implements OnInit {
  jobForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    body: new FormControl(''),
  });

  @ViewChild('form') form!: NgForm;

  constructor(private jobApi: JobApiService) {}

  ngOnInit(): void {}

  get title() {
    return this.jobForm.get('title');
  }

  get body() {
    return this.jobForm.get('body');
  }

  onSubmit() {}
}
