import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '@classes/project';
import { ProjectsApiService } from '@services/projects-api.service';
import { Subject } from 'rxjs';
import { SubSink } from 'subsink';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  projectsLink = `${ProjectsRoutesNames.ROOT}`;
  private subs = new SubSink();

  projects$ = new Subject<Project[]>();

  constructor(private projectsApi: ProjectsApiService) {}

  ngOnInit(): void {
    this.subs.sink = this.projectsApi
      .getAllProjects()
      .subscribe((res) => this.projects$.next(res));
  }

  getLink(p: Project): (string | undefined)[] {
    if (!p) return [];
    return ['', p.creator, this.projectsLink, p.name];
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
