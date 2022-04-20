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
import { AssetsModule } from '@modules/assets/assets.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@modules/shared/shared.module';
import { AdminModule } from '@modules/admin/admin.module';
import { FeedModule } from '@modules/feed/feed.module';
import { JobsModule } from '@modules/jobs/jobs.module';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      // The domain and clientId were configured in the previous chapter
      domain: environment.authDomain,
      clientId: environment.authClientId,

      // Request this audience at user authentication time
      audience: `https://${environment.authDomain}/api/v2/`,

      // Request this scope at user authentication time
      scope: 'profile read:current_user',

      // Specify configuration for the interceptor
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts e.g. 'https://gamepub-dev.us.auth0.com/api/v2/' (note the asterisk)
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
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
