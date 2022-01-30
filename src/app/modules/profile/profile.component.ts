import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@classes/project';
import { User } from '@classes/user';
import { UserService } from '@modules/shared/user.service';
import { ProjectService } from '@services/project.service';
import { Observable, of, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  username$ = new ReplaySubject<string>(1);
  profile$!: Observable<User | null>;
  projects$!: Observable<Project[]>;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.username$.next(params.get('username') || '');
    });

    this.profile$ = this.username$.pipe(
      switchMap((username) => {
        if (!username) return of(null);
        else return this.userService.getUserProfileByUsername(username);
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
