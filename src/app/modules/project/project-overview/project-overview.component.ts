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
import { ProjectService } from '@services/project.service';
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
  // @Input() project!: Project;
  // @Output() imageUpdatedEvent = new EventEmitter<Project>();
  private subs = new SubSink();

  username!: string;
  projName!: string;

  project!: Project;
  updatingImage = false;
  readonly noProjectError$ = new Subject<boolean>();

  constructor(
    public route: ActivatedRoute,
    private projService: ProjectService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.projName = this.route.snapshot.paramMap.get('projectname') || '';
    this.username = this.route.snapshot.paramMap.get('username') || '';
    this.subs.sink = this.projService
      .getProjectByFullPath(this.username, this.projName)
      .pipe(
        shareReplay(1),
        map((project) => {
          if (project) return project;
          else throw new Error('No project found');
        }),
        catchError((err) => {
          console.error(err);
          this.noProjectError$.next(true);
          return of(null);
        })
      )
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
        // console.log(this.project);
        // console.log(project);
        this.project = project;
        this.ref.markForCheck();
      });
  }

  // unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
