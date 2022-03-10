import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '@classes/project';
import { AdminService } from '@services/admin.service';
import { ProjectsApiService } from '@services/projects-api.service';
import { UsersApiService } from '@services/users-api.service';
import { UsersService } from '@services/users.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter, toArray } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  games!: Project[];
  constructor(
    private adminService: AdminService,
    private usersApi: UsersApiService
  ) {}
  ngOnInit(): void {
    this.games = this.adminService.parseSteamStore();
  }

  generateProjects() {
    this.subs.sink = this.adminService
      .createNewTestUsers(this.games)
      .pipe(
        switchMap((res) => {
          console.log(res);
          if (res)
            return this.adminService
              .createNewTestGame(res)
              .pipe(catchError((err) => of(null)));
          else return of(null);
        })
      )
      .subscribe(console.log, console.error);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
