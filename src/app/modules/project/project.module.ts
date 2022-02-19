import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PackageService } from '@services/package.service';
import { CreateProjectComponent } from './create-project/create-project.component';
import { OpenupmPackageDetailsComponent } from './openupm-package-details/openupm-package-details.component';
import { PackageListingComponent } from './package-listing/package-listing.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { ProjectTreeComponent } from './project-tree/project-tree.component';
import { ProjectComponent } from './project.component';
import { ProjectProxyComponent } from './project-proxy/project-proxy.component';
import { SharedModule } from '@modules/shared/shared.module';
import { JobListingComponent } from './job-listing/job-listing.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectService } from './project.service';
import { CreateJobComponent } from './create-job/create-job.component';

@NgModule({
  declarations: [
    ProjectComponent,
    OpenupmPackageDetailsComponent,
    PackageListingComponent,
    ProjectTreeComponent,
    ProjectOverviewComponent,
    CreateProjectComponent,
    ProjectProxyComponent,
    JobListingComponent,
    JobDetailsComponent,
    ProjectDetailsComponent,
    CreateJobComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  providers: [PackageService],
})
export class ProjectModule {}
