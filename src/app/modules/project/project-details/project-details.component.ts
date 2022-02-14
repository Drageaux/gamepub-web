import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubContents } from '@classes/github-contents';
import { UnityManifest } from '@classes/unity-manifest';
import { ProjectService } from '@services/project.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  username!: string;
  projName!: string;

  githubContents$!: Observable<GithubContents[] | null>;
  manifest$!: Observable<UnityManifest | null>;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private projService: ProjectService
  ) {}

  ngOnInit(): void {
    // need the call to the ProjectComponent, hence .parent
    this.username = this.route.snapshot.parent?.paramMap.get('username') || '';
    this.projName =
      this.route.snapshot.parent?.paramMap.get('projectname') || '';

    // TODO: optimize these to reuse the requested project
    this.githubContents$ = this.projService
      .getProjectByFullPath(this.username, this.projName)
      .pipe(
        switchMap((proj) =>
          proj && proj.githubRepo
            ? this.projService.loadRepoTree(proj.githubRepo)
            : of(null)
        )
      );

    this.manifest$ = this.projService
      .getProjectByFullPath(this.username, this.projName)
      .pipe(
        switchMap((proj) =>
          proj && proj.githubRepo
            ? this.projService.getManifest(proj.githubRepo)
            : of(null)
        )
      );
  }
}
