import { Component, OnInit } from '@angular/core';
import { ProjectService } from '@services/project.service';
import { UserService } from '@services/shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.id;
  }
}
