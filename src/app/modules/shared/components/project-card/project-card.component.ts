import { Component, Input, OnInit } from '@angular/core';
import { Project } from '@classes/project';
import { ProjectsRoutesNames } from '@classes/routes.names';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  projectsLink = `${ProjectsRoutesNames.ROOT}`;

  @Input()
  project!: Project;

  constructor() {}

  ngOnInit(): void {}

  buildRouterLink(p: Project): (string | undefined)[] {
    if (!p) return [];
    return ['', p.creator, this.projectsLink, p.name];
  }
}
