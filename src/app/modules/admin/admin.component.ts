import { Component, OnInit } from '@angular/core';
import { ProjectApiService } from '@services/project-api.service';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  games!: any;
  constructor(private projectApi: ProjectApiService) {}

  ngOnInit(): void {
    this.games = this.projectApi.parseSteamStore();
  }

  generateProjects() {
    this.projectApi
      .createNewTestUsers(this.games)
      .pipe(
        switchMap((users) => {
          console.log(users);
          return this.projectApi.createNewTestGames(this.games);
        })
      )
      .subscribe(console.log, console.error);
  }
}
