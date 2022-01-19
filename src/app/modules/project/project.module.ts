import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { OpenupmPackageDetailsComponent } from './openupm-package-details/openupm-package-details.component';
import { PackageListingComponent } from './package-listing/package-listing.component';
import { ProjectTreeComponent } from './project-tree/project-tree.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { RouterModule } from '@angular/router';
import { PackageService } from '@services/package.service';
import { ProjectService } from '@services/project.service';

@NgModule({
  declarations: [
    ProjectComponent,
    OpenupmPackageDetailsComponent,
    PackageListingComponent,
    ProjectTreeComponent,
    ProjectOverviewComponent,
  ],
  imports: [CommonModule, RouterModule],
  providers: [ProjectService, PackageService],
})
export class ProjectModule {}
