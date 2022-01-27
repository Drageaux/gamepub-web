import { Component, OnInit } from '@angular/core';
import { ProjectService } from '@services/project.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.parseSteamStore();
  }
}
