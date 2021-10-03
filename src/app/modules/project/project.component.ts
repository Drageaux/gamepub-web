import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projContents$: Observable<any[]>;

  constructor(private projService: ProjectService) {
    this.projContents$ = projService.loadRepoTree('OpenHogwarts', 'hogwarts');
  }

  ngOnInit(): void {}
}
