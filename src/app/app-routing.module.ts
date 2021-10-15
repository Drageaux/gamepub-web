import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetDashboardComponent } from '@modules/asset-dashboard/asset-dashboard.component';
import { ProjectComponent } from '@modules/project/project.component';

const routes: Routes = [
  { path: 'project/:id', component: ProjectComponent },
  { path: 'dashboard', component: AssetDashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // redirect
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
