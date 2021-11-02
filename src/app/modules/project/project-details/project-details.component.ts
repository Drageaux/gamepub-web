import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@classes/project';
import { ProjectService } from '@services/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  owner?: string;
  repo?: string;
  projId?: string;
  project$?: Observable<Project>;

  constructor(
    private route: ActivatedRoute,
    private projService: ProjectService
  ) {
    console.log(route.url);
  }

  ngOnInit(): void {
    this.owner = this.route.snapshot.paramMap.get('ghOwner') || '';
    this.repo = this.route.snapshot.paramMap.get('ghRepo') || '';
    console.log(this.owner, this.repo);

    if (!this.owner || !this.repo) {
      console.log(this.route.parent?.snapshot.paramMap.get('id'));
      this.project$ = this.projService.getProject(this.projId!);
    }
  }
}
