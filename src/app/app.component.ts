import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UsersService } from '@services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GamePub';
  profile$;
  environment = environment;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public usersService: UsersService,
    public auth: AuthService
  ) {
    this.profile$ = usersService.profile$;
  }
}
