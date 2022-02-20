import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '@classes/job';
import { JobApiService } from '@services/job-api.service';
import { Subject } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  jobs$ = new Subject<Job[]>();

  constructor(private jobApi: JobApiService) {}

  ngOnInit(): void {
    this.subs.sink = this.jobApi.getAllJobs().subscribe((jobs) => {
      this.jobs$.next(jobs);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
