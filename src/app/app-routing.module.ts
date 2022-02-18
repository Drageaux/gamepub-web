import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '@modules/admin/admin.component';
import { AssetDashboardComponent } from '@modules/asset-dashboard/asset-dashboard.component';
import { CreateAssetComponent } from '@modules/asset/create-asset/create-asset.component';
import { CreateProjectComponent } from '@modules/project/create-project/create-project.component';
import { ProjectProxyComponent } from '@modules/project/project-proxy/project-proxy.component';
import { ProjectComponent } from '@modules/project/project.component';
import { ProfileComponent } from '@modules/profile/profile.component';
import { FeedComponent } from '@modules/feed/feed.component';
import { JobDetailsComponent } from '@modules/project/job-details/job-details.component';
import { JobListingComponent } from '@modules/project/job-listing/job-listing.component';
import { ProjectOverviewComponent } from '@modules/project/project-overview/project-overview.component';
import { ProjectDetailsComponent } from '@modules/project/project-details/project-details.component';
import { CreateJobComponent } from '@modules/project/create-job/create-job.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: FeedComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'new-project', component: CreateProjectComponent },
  { path: 'new-asset', component: CreateAssetComponent },
  { path: 'dashboard', component: AssetDashboardComponent },
  { path: 'project/:id', component: ProjectProxyComponent },
  {
    path: ':username',
    children: [
      {
        path: '',
        component: ProfileComponent,
        pathMatch: 'full',
      },
      {
        // TODO: check against generated name
        path: 'project/:projectname',
        component: ProjectComponent,
        children: [
          {
            path: '',
            component: ProjectOverviewComponent,
            pathMatch: 'full',
          },
          { path: 'details', component: ProjectDetailsComponent },
          {
            path: 'jobs',
            children: [
              { path: '', component: JobListingComponent, pathMatch: 'full' },
              {
                path: 'new-job',
                component: CreateJobComponent,
                pathMatch: 'full',
              },
              { path: ':jobnumber', component: JobDetailsComponent },
            ],
          },
        ],
      },
      // { path: '**', redirectTo: ':username' }, // TODO: redirect to user profile
    ],
  },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // redirect
  { path: '**', redirectTo: '' }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
