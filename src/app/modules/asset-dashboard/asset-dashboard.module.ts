import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetDashboardComponent } from './asset-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AssetDashboardComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AssetDashboardModule {}
