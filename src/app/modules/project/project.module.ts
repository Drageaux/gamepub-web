import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { OpenupmPackageDetailsComponent } from './openupm-package-details/openupm-package-details.component';
import { PackageListingComponent } from './package-listing/package-listing.component';



@NgModule({
  declarations: [
    ProjectComponent,
    OpenupmPackageDetailsComponent,
    PackageListingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProjectModule { }
