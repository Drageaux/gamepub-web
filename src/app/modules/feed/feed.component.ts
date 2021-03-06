import { User } from '@classes/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '@classes/project';
import { ProjectsApiService } from '@services/projects-api.service';
import { Subject } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
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
    return p.creator instanceof String
      ? ['project', p._id]
      : ['', (p.creator as User).username, 'project', p.name];
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
