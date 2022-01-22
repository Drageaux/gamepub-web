import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './modules/profile/profile.component';
import { AssetDashboardComponent } from '@modules/asset-dashboard/asset-dashboard.component';
import { ProjectComponent } from '@modules/project/project.component';
import { CreateProjectComponent } from '@modules/project/create-project/create-project.component';
import { CreateAssetComponent } from '@modules/asset/create-asset/create-asset.component';

const routes: Routes = [
  { path: 'new-project', component: CreateProjectComponent },
  { path: 'new-asset', component: CreateAssetComponent },
  { path: 'dashboard', component: AssetDashboardComponent },
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
        path: 'project/:id',
        component: ProjectComponent,
      },
      { path: '*', redirectTo: ':username' },
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
