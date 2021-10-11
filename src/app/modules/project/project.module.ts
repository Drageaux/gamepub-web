import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { OpenupmPackageDetailsComponent } from './openupm-package-details/openupm-package-details.component';



@NgModule({
  declarations: [
    ProjectComponent,
    OpenupmPackageDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProjectModule { }
