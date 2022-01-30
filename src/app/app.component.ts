import { Component } from '@angular/core';
import { UserService } from '@modules/shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'game-comps-repo';
  profile$;

  constructor(private userService: UserService) {
    this.profile$ = userService.myProfile$;
  }
}
