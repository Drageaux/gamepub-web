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
  games!: any;
  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.games = this.projectService.parseSteamStore();
  }

  generateProjects() {
    this.projectService
      .createNewTestUsers(this.games)
      .pipe(
        switchMap((users) => {
          console.log(users);
          return this.projectService.createNewTestGames(this.games);
        })
      )
      .subscribe(console.log, console.error);
  }
}
