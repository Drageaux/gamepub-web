import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@classes/project';
import { UsersService } from '@services/users.service';
import { ProjectsApiService } from '@services/projects-api.service';
import { Observable, of, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsersApiService } from '@services/users-api.service';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { User } from '@auth0/auth0-angular';

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
    private usersService: UsersService,
    private usersApi: UsersApiService,
    private projectsService: ProjectsApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.username$.next(params.get('username') || '');
    });

    // TODO: authorize profile page access
    this.profile$ = this.username$.pipe(
      switchMap((username) => {
        if (!username) return of(null);
        else return this.usersApi.getUserProfileByUsername(username);
      })
    );
    this.projects$ = this.username$.pipe(
      switchMap((username) => {
        if (!username) return of([]);
        else return this.projectsService.getProjectsByUsername(username);
      })
    );
  }

  isUser(): Observable<boolean> {
    return this.username$.pipe(
      // TODO: check if logged in user is this profile's user
      switchMap((username) => of(true))
    );
  }
}
