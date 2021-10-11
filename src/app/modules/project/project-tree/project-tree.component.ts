import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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

  ngOnInit(): void {
    this.projContents$ = this.projService
      .loadRepoTree(this.owner, this.repo)
      .pipe(tap(console.log));
  }
}
