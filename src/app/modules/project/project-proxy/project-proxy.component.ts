import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { User } from '@classes/user';
import { ProjectApiService } from '@services/project-api.service';

/**
 * Takes a project ID and redirect user to the appropriate path
 * e.g. project/329042 --> this-user/project/cool-project
 */
@Component({
  selector: 'app-project-proxy',
  templateUrl: './project-proxy.component.html',
  styleUrls: ['./project-proxy.component.scss'],
})
export class ProjectProxyComponent implements OnInit {
  projectsLink = `${ProjectsRoutesNames.ROOT}`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectApi: ProjectApiService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectApi.getProjectById(id).subscribe(
        (res) => {
          if (res && res.creator && res.name) {
            this.router.navigate([
              '',
              (res.creator as User).username,
              this.projectsLink,
              res.name,
            ]);
          } else {
            this.router.navigate(['']);
          }
        },
        (err) => {
          console.error(err), this.router.navigate(['']);
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }
}
