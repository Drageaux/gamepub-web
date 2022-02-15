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

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectOverviewComponent implements OnInit, OnChanges, OnDestroy {
  private subs = new SubSink();

  username!: string;
  projName!: string;

  project!: Project;
  updatingImage = false;

  constructor(
    public route: ActivatedRoute,
    private projService: ProjectApiService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // grab the path
    this.username = this.route.snapshot.paramMap.get('username') || '';
    this.projName = this.route.snapshot.paramMap.get('projectname') || '';

    this.subs.sink = this.projService
      .getProjectByFullPath(this.username, this.projName)
      .subscribe((proj) => {
        if (proj) {
          this.project = proj;
          this.ref.markForCheck();
        }
        // TODO: else navigate off
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  onImageUploaded(fileData: string | null) {
    this.updatingImage = false;
    if (this.project._id == null) return;
    if (!fileData) return;

    this.subs.sink = this.projService
      .uploadProjectImageByProjectId(this.project._id, fileData)
      .subscribe((project) => {
        this.project = project;
        this.ref.markForCheck();
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
