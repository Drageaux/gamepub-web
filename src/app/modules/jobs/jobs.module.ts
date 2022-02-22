import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [JobsComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class JobsModule {}
