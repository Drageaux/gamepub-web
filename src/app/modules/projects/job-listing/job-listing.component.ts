import { switchMap, tap } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Job } from '@classes/job';
import { JobsApiService } from '@services/jobs-api.service';
import { of } from 'rxjs';
import { ProjectsService } from '../projects.service';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss'],
})
export class JobListingComponent implements OnInit {
  newJobLink = ProjectsRoutesNames.NEWJOB;

  jobs: Job[] = [];
  currUsername = '';

  constructor(
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private jobsApi: JobsApiService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.projectsService
      .getProject()
      .pipe(
        switchMap((project) => {
          if (!project?.name || !project?.creator) return of([]);
          return this.jobsApi.getJobsByProject(project.creator, project.name);
        })
      )
      .subscribe((jobs) => {
        this.jobs = jobs;
        this.ref.markForCheck();
      });

    this.usersService.username$.subscribe((username) => {
      this.currUsername = username || '';
    });
  }

  isCreator() {
    return this.currUsername === this.projectsService.username;
  }
}
