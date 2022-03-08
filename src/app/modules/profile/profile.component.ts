import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@classes/project';
import { UsersService } from '@services/users.service';
import { ProjectsApiService } from '@services/projects-api.service';
import { forkJoin, Observable, of, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UsersApiService } from '@services/users-api.service';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  newProjectLink = `${ProjectsRoutesNames.NEWPROJECT}`;
  projectsLink = `${ProjectsRoutesNames.ROOT}`;

  username$ = new ReplaySubject<string>(1);
  profile$!: Observable<User | null>;
  projects$!: Observable<Project[]>;

  constructor(
    public auth: AuthService,
    public usersService: UsersService,
    private usersApi: UsersApiService,
    private projectsService: ProjectsApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.username$.next(params.get('username') || '');
    });

    this.profile$ = this.username$.pipe(
      switchMap((username) => {
        if (!username) return of(null);
        return this.usersApi.getUserProfileByUsername(username);
      })
    );
    // this.profile$ = this.auth;

    // TODO: authorize profile page access
    this.projects$ = this.profile$.pipe(
      switchMap((user) => {
        if (!user) return of([]);
        return this.projectsService.getProjectsByUsername(user.username);
      })
    );
  }

  isUser(): Observable<boolean> {
    return forkJoin([this.username$, this.usersService.username$]).pipe(
      // TODO: check if logged in user is this profile's user
      map((results) => {
        const [paramUsername, currUsername] = results;
        console.log(currUsername);
        return paramUsername == currUsername;
      })
    );
  }
}
