import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Import Auth0 module from the SDK
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Feature Modules
import { AssetDashboardModule } from '@modules/asset-dashboard/asset-dashboard.module';
import { ProfileModule } from '@modules/profile/profile.module';
import { ProjectsModule } from '@modules/projects/projects.module';
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
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      // The domain and clientId were configured in the previous chapter
      domain: `${environment.authDomain}`,
      clientId: 'BjaRXkzA3yLCGdwL0aVXnj7DVyijZAoj',

      // Request this audience at user authentication time
      audience: `https://${environment.authDomain}/api/v2/`,

      // Request this scope at user authentication time
      scope: 'profile read:current_user',

      // Specify configuration for the interceptor
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://gamepub-dev.us.auth0.com/api/v2/' (note the asterisk)
            uri: `https://${environment.authDomain}/api/v2/*`,
            tokenOptions: {
              // The attached token should target this audience
              audience: `https://${environment.authDomain}/api/v2/`,

              // The attached token should have these scopes
              scope: 'profile read:current_user',
            },
          },
          {
            uri: `${environment.apiUrl}/*`,
            allowAnonymous: true,
          },
        ],
      },
    }),
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
