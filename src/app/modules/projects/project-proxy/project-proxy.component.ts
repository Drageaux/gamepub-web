import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '@classes/profile';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { ProjectsApiService } from '@services/projects-api.service';

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
  projectsLink = ProjectsRoutesNames.ROOT;
  projectProxyParamName = ProjectsRoutesNames.ROOTPROXYPARAMNAME;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsApi: ProjectsApiService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get(this.projectProxyParamName);

    if (id) {
      this.projectsApi.getProjectById(id).subscribe(
        (res) => {
          if (res && res.creator && res.name) {
            this.router.navigate([
              '',
              res.creator,
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
      this.router.navigate(['']);
    }
  }
}
