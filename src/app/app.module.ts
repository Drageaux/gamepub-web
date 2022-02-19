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
import { AdminModule } from '@modules/admin/admin.module';
import { FeedModule } from '@modules/feed/feed.module';
import { JobsModule } from '@modules/jobs/jobs.module';

// API Services
import { JobApiService } from '@services/job-api.service';
import { ProjectApiService } from '@services/project-api.service';
import { UserApiService } from '@services/user-api.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FeedModule,
    JobsModule,
    ProfileModule,
    ProjectModule,
    AdminModule,
    AssetDashboardModule,
  ],
  exports: [],
  providers: [AssetService, ProjectApiService, UserApiService, JobApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
