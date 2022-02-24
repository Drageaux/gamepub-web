import { Component, OnInit } from '@angular/core';
import { ProjectsApiService } from '@services/projects-api.service';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  games!: any;
  constructor(private projectsApi: ProjectsApiService) {}

  ngOnInit(): void {
    this.games = this.projectsApi.parseSteamStore();
  }

  generateProjects() {
    this.projectsApi
      .createNewTestUsers(this.games)
      .pipe(
        switchMap((users) => {
          console.log(users);
          return this.projectsApi.createNewTestGames(this.games);
        })
      )
      .subscribe(console.log, console.error);
  }
}
