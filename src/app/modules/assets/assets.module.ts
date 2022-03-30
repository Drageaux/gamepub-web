import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsComponent } from './assets.component';
import { CreateAssetComponent } from './create-asset/create-asset.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AssetsComponent, CreateAssetComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AssetsModule {}
