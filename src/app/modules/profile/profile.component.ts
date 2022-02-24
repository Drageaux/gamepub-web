import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@classes/project';
import { User } from '@classes/user';
import { UserService } from '@services/user.service';
import { ProjectApiService } from '@services/project-api.service';
import { Observable, of, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserApiService } from '@services/user-api.service';
import { ProjectsRoutesNames } from '@classes/routes.names';

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
    private userService: UserService,
    private userApi: UserApiService,
    private projectService: ProjectApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.username$.next(params.get('username') || '');
    });

    this.profile$ = this.username$.pipe(
      switchMap((username) => {
        if (!username) return of(null);
        else return this.userApi.getUserProfileByUsername(username);
      })
    );
    this.projects$ = this.username$.pipe(
      switchMap((username) => {
        if (!username) return of([]);
        else return this.projectService.getProjectsByUsername(username);
      })
    );
  }

  isUser(): Observable<boolean> {
    return this.username$.pipe(
      switchMap((username) => of(username === this.userService.username))
    );
  }
}
