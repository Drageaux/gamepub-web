import { Component, OnInit } from '@angular/core';
import { Project } from '@classes/project';
import { User } from '@classes/user';
import { ProjectService } from '@services/project.service';
import { UserService } from '@modules/shared/user.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile$!: Observable<User>;
  projects$!: Observable<Project[]>;

  constructor(
    private userService: UserService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.profile$ = this.userService.myProfile$;
    this.projects$ = this.profile$.pipe(
      switchMap((prof: User) =>
        prof ? this.projectService.getProjectsByUsername(prof.username) : of([])
      )
    );
  }
}
