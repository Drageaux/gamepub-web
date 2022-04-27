import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class ProfileModule {}
