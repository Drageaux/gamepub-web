import { Component, OnInit } from '@angular/core';
import { User } from '@classes/user';
import { ProjectService } from '@services/project.service';
import { UserService } from '@services/shared/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile$!: Observable<User>;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.profile$ = this.userService.profile$;
  }
}
