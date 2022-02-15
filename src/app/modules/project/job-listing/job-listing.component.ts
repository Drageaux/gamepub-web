import { Component, Input, OnInit } from '@angular/core';
import { Job } from '@classes/job';
import { JobApiService } from '@services/job-api.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss'],
})
export class JobListingComponent implements OnInit {
  jobs$!: Observable<Job[]>;

  constructor(private service: JobApiService) {}

  ngOnInit(): void {
    // TODO: get jobs from db
    // this.jobs$ = this.service.getJobsByProject(this.username, this.projName);
    this.jobs$ = of([
      { _id: '0', project: '0', title: 'Main Character 3D model' },
      { _id: '0', project: '0', title: 'Main Character 3D animation' },
      { _id: '0', project: '0', title: '20 Main Character sounds' },
      { _id: '0', project: '0', title: 'Product Manager needed!' },
    ]);
  }
}
