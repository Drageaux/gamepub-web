import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Feature Modules
import { AssetDashboardModule } from '@modules/asset-dashboard/asset-dashboard.module';
import { ProfileModule } from '@modules/profile/profile.module';
import { ProjectModule } from '@modules/project/project.module';
import { AssetService } from '@services/asset.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileModule,
    ProjectModule,
    AssetDashboardModule,
  ],
  exports: [],
  providers: [AssetService],
  bootstrap: [AppComponent],
})
export class AppModule {}
