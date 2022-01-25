import { Component, Input, OnInit } from '@angular/core';
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

  onImageUploaded(event: any) {
    console.log(event);
    this.projService.uploadProjectImage(this.project._id, event);
  }
}
