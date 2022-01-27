import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UploadComponent } from '@components/upload/upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSizePipe } from './file-size.pipe';

@NgModule({
  declarations: [UploadComponent, FileSizePipe],
  exports: [UploadComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [UserService],
})
export class SharedModule {}
