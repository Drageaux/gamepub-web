import { map, switchMap } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { Job } from '@classes/job';
import { Project } from '@classes/project';
import { JobsApiService } from '@services/jobs-api.service';
import { Observable, of } from 'rxjs';
import { ProjectsService } from '../projects.service';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { Profile } from '@classes/profile';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss'],
})
export class JobListingComponent implements OnInit {
  newJobLink = `${ProjectsRoutesNames.NEWJOB}`;

  project!: Project;
  jobs$!: Observable<Job[]>;

  constructor(
    private projectsService: ProjectsService,
    private jobsApi: JobsApiService
  ) {}

  ngOnInit(): void {
    this.jobs$ = this.projectsService.getProject().pipe(
      switchMap((project) => {
        if (!project?.name || !project?.creator) return of([]);
        return this.jobsApi.getJobsByProject(project.creator, project.name);
      })
    );

    // this.jobs$ = of([
    //   { _id: '0', project: '0', title: 'Main Character 3D model' },
    //   { _id: '0', project: '0', title: 'Main Character 3D animation' },
    //   { _id: '0', project: '0', title: '20 Main Character sounds' },
    //   { _id: '0', project: '0', title: 'Product Manager needed!' },
    // ]);
  }
}
