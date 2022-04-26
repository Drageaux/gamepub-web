import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@classes/project';
import { ProjectsApiService } from '@services/projects-api.service';
import { UsersService } from '@services/users.service';
import { Observable, of, Subject } from 'rxjs';
import { shareReplay, map, catchError } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
})
export class ProjectOverviewComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  project!: Project | null;
  updatingImage = false;

  constructor(
    public route: ActivatedRoute,
    public usersService: UsersService,
    public projectsService: ProjectsService,
    private projectApi: ProjectsApiService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.projectsService.getProject().subscribe((proj) => {
      if (proj) {
        this.project = proj;
      }
    });
  }

  onImageUploaded(fileData: string | null) {
    this.updatingImage = false;
    if (!this.project?._id) return;
    if (!fileData) return;

    this.subs.sink = this.projectApi
      .uploadProjectImageByProjectId(this.project?._id, fileData)
      .subscribe((project) => {
        this.project = project;
        this.ref.markForCheck(); // explicitly check changes in project reference
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
