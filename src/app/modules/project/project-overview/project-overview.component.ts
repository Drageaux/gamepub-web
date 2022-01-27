import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@classes/project';
import { ProjectService } from '@services/project.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectOverviewComponent implements OnInit, OnChanges {
  @Input() project!: Project;
  @Output() imageUpdatedEvent = new EventEmitter<Project>();
  updatingImage = false;

  constructor(
    private projService: ProjectService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  onImageUploaded(fileData: string | null) {
    this.updatingImage = false;
    if (!fileData) return;
    // pass back to parent to keep the entire page up to date
    this.projService
      .uploadProjectImage(this.project._id, fileData)
      .subscribe((project) => {
        console.log(project);
        this.imageUpdatedEvent.emit(project);
        this.ref.detectChanges();
      });
  }
}
