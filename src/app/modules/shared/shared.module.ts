import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UploadComponent } from '@components/upload/upload.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UploadComponent],
  exports: [UploadComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [UserService],
})
export class SharedModule {}
