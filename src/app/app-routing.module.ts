import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '@modules/admin/admin.component';
import { AssetDashboardComponent } from '@modules/asset-dashboard/asset-dashboard.component';
import { CreateProjectComponent } from '@modules/projects/create-project/create-project.component';
import { ProjectProxyComponent } from '@modules/projects/project-proxy/project-proxy.component';
import { ProfileComponent } from '@modules/profile/profile.component';
import { FeedComponent } from '@modules/feed/feed.component';
import { CreateAssetComponent } from '@modules/assets/create-asset/create-asset.component';
import { JobsComponent } from '@modules/jobs/jobs.component';
import {
  FeedRoutesNames,
  JobsRoutesNames,
  ProjectsRoutesNames,
  ProfileRoutesNames,
  AssetsRoutesNames,
} from '@classes/routes.names';
import { AuthRoleGuard } from './guards/auth-role.guard';
import { AssetsComponent } from '@modules/assets/assets.component';
import { AssetProxyComponent } from '@modules/assets/asset-proxy/asset-proxy.component';

const routes: Routes = [
  {
    path: FeedRoutesNames.FEED,
    pathMatch: 'full',
    component: FeedComponent,
  },
  {
    path: JobsRoutesNames.JOBS,
    component: JobsComponent,
  },
  {
    path: 'admin',
    pathMatch: 'full',
    component: AdminComponent,
    canActivate: [AuthRoleGuard],
    data: {
      role: 'admin',
    },
  },
  {
    path: ProjectsRoutesNames.NEWPROJECT,
    component: CreateProjectComponent,
  },
  {
    path: AssetsRoutesNames.NEWASSET,
    component: CreateAssetComponent,
  },
  {
    path: 'dashboard',
    component: AssetDashboardComponent,
  },
  // redirect to {username}/projects/{project-name}
  {
    path: `${ProjectsRoutesNames.ROOT}/${ProjectsRoutesNames.ROOTPROXYPARAM}`,
    component: ProjectProxyComponent,
  },
  // redirect to {username}/assets/{asset-puid}/{slug}
  {
    path: `${AssetsRoutesNames.ROOT}/${AssetsRoutesNames.ROOTPROXYPARAM}`,
    component: AssetProxyComponent,
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
        path: `${ProjectsRoutesNames.PROJECTS}/${ProjectsRoutesNames.PROJECTPARAM}`,
        loadChildren: () =>
          import('@modules/projects/projects.module').then(
            (m) => m.ProjectsModule
          ),
      },
      // redirect to path with slug
      {
        path: `${AssetsRoutesNames.ASSETS}/${AssetsRoutesNames.ASSETPARAM}`,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: AssetProxyComponent,
          },
          {
            path: AssetsRoutesNames.SLUGPARAM,
            component: AssetsComponent,
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
