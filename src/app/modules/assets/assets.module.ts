import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsComponent } from './assets.component';
import { CreateAssetComponent } from './create-asset/create-asset.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AssetProxyComponent } from './asset-proxy/asset-proxy.component';

@NgModule({
  declarations: [AssetsComponent, CreateAssetComponent, AssetProxyComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AssetsModule {}
