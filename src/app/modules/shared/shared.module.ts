import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UploadComponent } from '@components/upload/upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSizePipe } from './file-size.pipe';
import { ProgressiveImageComponent } from './progressive-image/progressive-image.component';
import { ProgressiveImageDirective } from './progressive-image/progressive-image.directive';
import { JobCardComponent } from './components/job-card/job-card.component';

@NgModule({
  declarations: [
    UploadComponent,
    FileSizePipe,
    ProgressiveImageComponent,
    ProgressiveImageDirective,
    JobCardComponent,
  ],
  exports: [
    UploadComponent,
    ProgressiveImageComponent,
    ProgressiveImageDirective,
    JobCardComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [UserService],
})
export class SharedModule {}
