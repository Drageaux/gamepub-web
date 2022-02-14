import { Component, Input, OnInit } from '@angular/core';
import { Job } from '@classes/job';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss'],
})
export class JobListingComponent implements OnInit {
  @Input() jobs: Job[] = [];

  constructor() {}

  ngOnInit(): void {}
}
