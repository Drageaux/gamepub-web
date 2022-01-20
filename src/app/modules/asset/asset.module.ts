import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetComponent } from './asset.component';
import { CreateAssetComponent } from './create-asset/create-asset.component';



@NgModule({
  declarations: [
    AssetComponent,
    CreateAssetComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AssetModule { }
