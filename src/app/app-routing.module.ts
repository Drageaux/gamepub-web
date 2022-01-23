import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetDashboardComponent } from '@modules/asset-dashboard/asset-dashboard.component';
import { CreateAssetComponent } from '@modules/asset/create-asset/create-asset.component';
import { CreateProjectComponent } from '@modules/project/create-project/create-project.component';
import { ProjectProxyComponent } from '@modules/project/project-proxy/project-proxy.component';
import { ProjectComponent } from '@modules/project/project.component';
import { ProfileComponent } from './modules/profile/profile.component';

const routes: Routes = [
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
      },
      // { path: '**', redirectTo: ':username' }, // TODO: redirect to user profile
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // redirect
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
