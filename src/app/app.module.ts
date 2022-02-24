import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Feature Modules
import { AssetDashboardModule } from '@modules/asset-dashboard/asset-dashboard.module';
import { ProfileModule } from '@modules/profile/profile.module';
import { ProjectsModule } from '@modules/project/projects.module';
import { AssetsService } from '@services/assets.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@modules/shared/shared.module';
import { AdminModule } from '@modules/admin/admin.module';
import { FeedModule } from '@modules/feed/feed.module';
import { JobsModule } from '@modules/jobs/jobs.module';

// API Services
import { JobsApiService } from '@services/jobs-api.service';
import { ProjectsApiService } from '@services/projects-api.service';
import { UsersApiService } from '@services/users-api.service';

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
    ProjectsModule,
    AdminModule,
    AssetDashboardModule,
  ],
  exports: [],
  providers: [
    AssetsService,
    ProjectsApiService,
    UsersApiService,
    JobsApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
