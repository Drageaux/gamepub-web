import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { CreateJobComponent } from './create-job/create-job.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { JobPageComponent } from './job-page/job-page.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { ProjectsComponent } from './projects.component';
import { SubmissionDetailsComponent } from './submission-details/submission-details.component';
import { SubmissionListingComponent } from './submission-listing/submission-listing.component';
import { SubmitJobComponent } from './submit-job/submit-job.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      {
        path: '',
        component: ProjectOverviewComponent,
        pathMatch: 'full',
      },
      {
        path: ProjectsRoutesNames.DETAILS,
        component: ProjectDetailsComponent,
      },
      {
        path: ProjectsRoutesNames.JOBS,
        children: [
          {
            path: '',
            component: JobListingComponent,
            pathMatch: 'full',
          },
          {
            path: ProjectsRoutesNames.NEWJOB,
            component: CreateJobComponent,
            pathMatch: 'full',
          },
          {
            path: ProjectsRoutesNames.JOBPARAM,
            component: JobPageComponent,
            children: [
              {
                path: '',
                // component: JobDetailsComponent,
                pathMatch: 'full',
              },
              {
                path: `submit`,
                pathMatch: 'full',
                component: SubmitJobComponent,
              },
              {
                path: `${ProjectsRoutesNames.JOBSUBMISSIONS}`,
                pathMatch: 'full',
                component: SubmissionListingComponent,
              },
              {
                path: `${ProjectsRoutesNames.JOBSUBMISSIONS}/${ProjectsRoutesNames.JOBSUBMISSIONPARAM}`,
                component: SubmissionDetailsComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
