import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { ProgressiveImageComponent } from './progressive-image/progressive-image.component';
import { ProgressiveImageDirective } from './progressive-image/progressive-image.directive';
import { JobCardComponent } from './components/job-card/job-card.component';
import { UploadComponent } from '@components/upload/upload.component';

import { FileSizePipe } from './file-size.pipe';

import { DateAgoPipe } from '@modules/shared/date-ago.pipe';

@NgModule({
  declarations: [
    UploadComponent,
    FileSizePipe,
    DateAgoPipe,
    ProgressiveImageComponent,
    ProgressiveImageDirective,
    JobCardComponent,
  ],
  exports: [
    UploadComponent,
    FileSizePipe,
    DateAgoPipe,
    ProgressiveImageComponent,
    ProgressiveImageDirective,
    JobCardComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [],
})
export class SharedModule {}
