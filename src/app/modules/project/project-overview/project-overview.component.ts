import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@classes/project';
import { ProjectService } from '@services/project.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
})
export class ProjectOverviewComponent implements OnInit {
  @Input() project!: Project;
  @Output() imageUpdatedEvent = new EventEmitter<Project>();
  updatingImage = false;

  constructor(
    private route: ActivatedRoute,
    private projService: ProjectService
  ) {
    // console.log(route.url);
  }

  ngOnInit(): void {
    // console.log(this.route.parent?.snapshot.paramMap.get('id'));
    // this.project$ = this.projService.getProject(this.projId!);
  }

  onImageUploaded(fileData: string | null) {
    console.log(fileData);
    this.updatingImage = false;
    if (!fileData) return;
    // pass back to parent to keep the entire page up to date
    this.projService
      .uploadProjectImage(this.project._id, fileData)
      .subscribe((project) => {
        console.log(project);
        this.imageUpdatedEvent.emit(project);
      });
  }
}
