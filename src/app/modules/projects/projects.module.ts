import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@modules/shared/shared.module';
import { RouterModule } from '@angular/router';

import { PackagesService } from '@services/packages.service';

import { CreateProjectComponent } from './create-project/create-project.component';
import { OpenupmPackageDetailsComponent } from './openupm-package-details/openupm-package-details.component';
import { PackageListingComponent } from './package-listing/package-listing.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { ProjectTreeComponent } from './reusable-components/project-tree/project-tree.component';
import { ProjectsComponent } from './projects.component';
import { ProjectProxyComponent } from './project-proxy/project-proxy.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { SubmitJobComponent } from './submit-job/submit-job.component';
import { CreateCommentComponent } from './reusable-components/create-comment/create-comment.component';
import { SubmissionDetailsComponent } from './submission-details/submission-details.component';
import { JobPageComponent } from './job-page/job-page.component';
import { SubmissionListingComponent } from './submission-listing/submission-listing.component';
import { JobCommentsComponent } from './reusable-components/job-comments/job-comments.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { JobsModule } from '@modules/jobs/jobs.module';

@NgModule({
  declarations: [
    ProjectsComponent,
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
    SubmitJobComponent,
    CreateCommentComponent,
    SubmissionDetailsComponent,
    JobPageComponent,
    SubmissionListingComponent,

    // reusables
    JobCommentsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule, // for quick 2-way binding like Commenting
    ProjectsRoutingModule,
    JobsModule, // import sharables
    SharedModule,
  ],
  // providers: [PackagesService],
})
export class ProjectsModule {}
