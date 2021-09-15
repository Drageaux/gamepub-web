import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Feature Modules
import { AssetDashboardModule } from './modules/asset-dashboard/asset-dashboard.module';
import { AssetService } from './services/asset.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AssetDashboardModule],
  providers: [AssetService],
  bootstrap: [AppComponent],
})
export class AppModule {}
