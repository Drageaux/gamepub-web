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
import { ProjectApiService } from '@services/project-api.service';
import { Observable, of, Subject } from 'rxjs';
import { shareReplay, map, catchError } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ProjectService } from '../project.service';

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
    private projectService: ProjectService,
    private projectApi: ProjectApiService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.projectService.getProject().subscribe((proj) => {
      if (proj) {
        this.project = proj;
      }
    });
  }

  onImageUploaded(fileData: string | null) {
    this.updatingImage = false;
    if (this.project?._id == null) return;
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
