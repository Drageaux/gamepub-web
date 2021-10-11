import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GithubContents } from 'src/app/classes/github-contents';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss'],
})
export class ProjectTreeComponent implements OnInit {
  @Input() owner!: string;
  @Input() repo!: string;
  projContents$!: Observable<GithubContents[]>;

  constructor(private projService: ProjectService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
    this.projContents$ = this.projService
      .loadRepoTree(this.owner, this.repo)
      .pipe(tap(console.log));
  }
}
