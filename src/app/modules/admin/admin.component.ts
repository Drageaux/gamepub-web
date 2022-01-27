import { Component, OnInit } from '@angular/core';
import { UserService } from '@modules/shared/user.service';
import { ProjectService } from '@services/project.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  generateProjects() {
    let games = this.projectService.parseSteamStore();

    this.projectService
      .createNewTestUsers(games)
      .pipe(
        switchMap((users) => {
          console.log(users);
          return this.projectService.createNewTestGames(games);
        })
      )
      .subscribe(console.log, console.error);
  }
}
