import { map, switchMap } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { Job } from '@classes/job';
import { Project } from '@classes/project';
import { JobApiService } from '@services/job-api.service';
import { Observable, of } from 'rxjs';
import { ProjectService } from '../project.service';
import { User } from '@classes/user';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss'],
})
export class JobListingComponent implements OnInit {
  project!: Project;
  jobs$!: Observable<Job[]>;

  constructor(
    private projectService: ProjectService,
    private jobApi: JobApiService
  ) {}

  ngOnInit(): void {
    this.jobs$ = this.projectService.getProject().pipe(
      switchMap((project) => {
        if (!project?.name || !(project?.creator as User)?._id) return of([]);
        return this.jobApi.getJobsByProject(
          (project?.creator as User).username,
          project?.name
        );
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
