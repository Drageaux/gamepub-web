import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class ProfileModule {}
