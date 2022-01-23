import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PackageService } from '@services/package.service';
import { ProjectService } from '@services/project.service';
import { CreateProjectComponent } from './create-project/create-project.component';
import { OpenupmPackageDetailsComponent } from './openupm-package-details/openupm-package-details.component';
import { PackageListingComponent } from './package-listing/package-listing.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { ProjectTreeComponent } from './project-tree/project-tree.component';
import { ProjectComponent } from './project.component';
import { ProjectProxyComponent } from './project-proxy/project-proxy.component';

@NgModule({
  declarations: [
    ProjectComponent,
    OpenupmPackageDetailsComponent,
    PackageListingComponent,
    ProjectTreeComponent,
    ProjectOverviewComponent,
    CreateProjectComponent,
    ProjectProxyComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [ProjectService, PackageService],
})
export class ProjectModule {}
