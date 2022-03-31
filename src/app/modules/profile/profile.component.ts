import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@classes/project';
import { UsersService } from '@services/users.service';
import { ProjectsApiService } from '@services/projects-api.service';
import {
  forkJoin,
  Observable,
  of,
  ReplaySubject,
  zip,
  combineLatest,
} from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { UsersApiService } from '@services/users-api.service';
import { AssetsRoutesNames, ProjectsRoutesNames } from '@classes/routes.names';
import { AuthService, User } from '@auth0/auth0-angular';
import { SubSink } from 'subsink';
import { Asset } from '@classes/asset';
import { AssetsApiService } from '@services/assets-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnChanges, OnDestroy {
  private subs = new SubSink();

  newProjectLink = ProjectsRoutesNames.NEWPROJECT;
  projectsLink = ProjectsRoutesNames.ROOT;
  assetsLink = AssetsRoutesNames.ROOT;

  username$ = new ReplaySubject<string>(1);
  profile$ = new ReplaySubject<User | null>();
  projects$!: Observable<Project[]>;
  assets$!: Observable<Asset[]>;

  constructor(
    public auth: AuthService,
    public usersService: UsersService,
    private usersApi: UsersApiService,
    private projectsApi: ProjectsApiService,
    private assetsApi: AssetsApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Get information assuming that this is not the current logged in user.
   * Instead, the isUser() method down below will perform that check.
   */
  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.subscribe((params) => {
      this.username$.next(params.get('username') || '');
    });

    this.subs.sink = this.username$
      .pipe(
        switchMap((username) => {
          // console.log({ username });
          if (!username) throw new Error('Username not provided.');
          return this.usersApi.getUserProfileByUsername(username);
        }),
        shareReplay(1), // switchMap re-wires the API call and does not share replay like in service
        map((profile) => {
          console.log({ profile });
          if (!!profile) return profile;
          else throw new Error('User not found.');
        }),
        catchError((err) => {
          console.log(err.message);
          this.router.navigate(['']);
          return of(null);
        })
      )
      .subscribe((profile) => this.profile$.next(profile));

    // TODO: authorize profile page access
    this.projects$ = this.profile$.pipe(
      switchMap((user) => {
        if (!user) return of([]);
        return this.projectsApi.getProjectsByUsername(user.username);
      })
    );

    this.assets$ = this.profile$.pipe(
      switchMap((user) => {
        if (!user) return of([]);
        return this.assetsApi.getAssetsByUsername(user.username);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  isUser(): Observable<boolean> {
    return combineLatest([this.username$, this.usersService.username$]).pipe(
      // TODO: check if logged in user is this profile's user
      map((results) => {
        const [paramUsername, currUsername] = results;
        return paramUsername == currUsername;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
