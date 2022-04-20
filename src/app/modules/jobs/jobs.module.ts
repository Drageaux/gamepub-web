import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';
import { JobSubscriptionButtonsComponent } from './reusable-components/job-subscription-buttons/job-subscription-buttons.component';

@NgModule({
  declarations: [JobsComponent, JobSubscriptionButtonsComponent],
  exports: [JobSubscriptionButtonsComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class JobsModule {}
