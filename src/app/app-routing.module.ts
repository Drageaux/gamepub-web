import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetDashboardComponent } from '@modules/asset-dashboard/asset-dashboard.component';
import { ProjectDetailsComponent } from '@modules/project/project-details/project-details.component';
import { ProjectOverviewComponent } from '@modules/project/project-overview/project-overview.component';
import { ProjectComponent } from '@modules/project/project.component';

const routes: Routes = [
  {
    path: 'project/:id',
    component: ProjectComponent,
    children: [
      {
        path: '',
        component: ProjectOverviewComponent,
      },
      {
        path: 'details',
        component: ProjectDetailsComponent,
      },
    ],
  },
  { path: 'dashboard', component: AssetDashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // redirect
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
