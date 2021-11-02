import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '@services/project.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
})
export class ProjectOverviewComponent implements OnInit {
  // thi
  constructor(
    private route: ActivatedRoute,
    private projService: ProjectService
  ) {
    console.log(route.url);
  }

  ngOnInit(): void {
    console.log(this.route.parent?.snapshot.paramMap.get('id'));
    // this.project$ = this.projService.getProject(this.projId!);
  }
}
