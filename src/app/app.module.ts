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
import { UserService } from '@services/shared/user.service';
import { UploadComponentComponent } from './components/upload-component/upload-component.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, UploadComponentComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ProfileModule,
    ProjectModule,
    AssetDashboardModule,
  ],
  providers: [UserService, AssetService],
  bootstrap: [AppComponent],
})
export class AppModule {}
