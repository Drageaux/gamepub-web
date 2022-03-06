import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '@modules/admin/admin.component';
import { AssetDashboardComponent } from '@modules/asset-dashboard/asset-dashboard.component';
import { CreateAssetComponent } from '@modules/asset/create-asset/create-asset.component';
import { CreateProjectComponent } from '@modules/projects/create-project/create-project.component';
import { ProjectProxyComponent } from '@modules/projects/project-proxy/project-proxy.component';
import { ProjectsComponent } from '@modules/projects/projects.component';
import { ProfileComponent } from '@modules/profile/profile.component';
import { FeedComponent } from '@modules/feed/feed.component';
import { JobDetailsComponent } from '@modules/projects/job-details/job-details.component';
import { JobListingComponent } from '@modules/projects/job-listing/job-listing.component';
import { ProjectOverviewComponent } from '@modules/projects/project-overview/project-overview.component';
import { ProjectDetailsComponent } from '@modules/projects/project-details/project-details.component';
import { CreateJobComponent } from '@modules/projects/create-job/create-job.component';
import { JobsComponent } from '@modules/jobs/jobs.component';
import {
  FeedRoutesNames,
  JobsRoutesNames,
  ProjectsRoutesNames,
  ProfileRoutesNames,
} from '@classes/routes.names';
import { AuthGuard } from '@auth0/auth0-angular';
import { AuthRoleGuard } from './guards/auth-role.guard';

const routes: Routes = [
  {
    path: `${FeedRoutesNames.FEED}`,
    pathMatch: 'full',
    component: FeedComponent,
  },
  { path: `${JobsRoutesNames.JOBS}`, component: JobsComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthRoleGuard],
    data: {
      role: 'admin',
    },
  },
  {
    path: `${ProjectsRoutesNames.NEWPROJECT}`,
    component: CreateProjectComponent,
  },
  { path: 'new-asset', component: CreateAssetComponent },
  { path: 'dashboard', component: AssetDashboardComponent },
  {
    path: `${ProjectsRoutesNames.ROOT}/:id`,
    component: ProjectProxyComponent,
  },
  {
    path: ProfileRoutesNames.PROFILE,
    children: [
      {
        path: '',
        component: ProfileComponent,
        pathMatch: 'full',
      },
      {
        path: `${ProjectsRoutesNames.ROOT}/${ProjectsRoutesNames.PROJECTPARAM}`,
        component: ProjectsComponent,
        children: [
          {
            path: '',
            component: ProjectOverviewComponent,
            pathMatch: 'full',
          },
          {
            path: `${ProjectsRoutesNames.DETAILS}`,
            component: ProjectDetailsComponent,
          },
          {
            path: `${ProjectsRoutesNames.JOBS}`,
            children: [
              { path: '', component: JobListingComponent, pathMatch: 'full' },
              {
                path: `${ProjectsRoutesNames.NEWJOB}`,
                component: CreateJobComponent,
                pathMatch: 'full',
              },
              {
                path: `${ProjectsRoutesNames.JOBPARAM}`,
                component: JobDetailsComponent,
              },
            ],
          },
        ],
      },
      { path: '**', redirectTo: '' }, // redirect to user profile
    ],
  },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // redirect
  { path: '**', redirectTo: '' }, // wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
