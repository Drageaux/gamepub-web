import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsComponent } from './assets.component';
import { CreateAssetComponent } from './create-asset/create-asset.component';



@NgModule({
  declarations: [
    AssetsComponent,
    CreateAssetComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AssetsModule { }
