import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './modules/profile/profile.component';
import { AssetDashboardComponent } from '@modules/asset-dashboard/asset-dashboard.component';
import { ProjectComponent } from '@modules/project/project.component';
import { CreateProjectComponent } from '@modules/project/create-project/create-project.component';

const routes: Routes = [
  { path: 'new-project', component: CreateProjectComponent },
  { path: 'dashboard', component: AssetDashboardComponent },
  {
    path: ':id',
    // TODO: check against ID
    component: ProfileComponent,
    children: [
      {
        path: 'project/:id',
        component: ProjectComponent,
      },
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
