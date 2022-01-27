import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '@classes/project';
import { ProjectService } from '@services/project.service';
import { Subject } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  projects$!: Subject<Project[]>;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.subs.sink = this.projectService
      .getAllProjects()
      .subscribe((res) => this.projects$.next(res));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
