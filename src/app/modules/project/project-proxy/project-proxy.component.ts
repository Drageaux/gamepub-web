import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@classes/user';
import { ProjectApiService } from '@services/project-api.service';

@Component({
  selector: 'app-project-proxy',
  templateUrl: './project-proxy.component.html',
  styleUrls: ['./project-proxy.component.scss'],
})
export class ProjectProxyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectApiService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getProjectById(id).subscribe(
        (res) => {
          if (res && res.creator && res.name) {
            this.router.navigateByUrl(
              '/' + (res.creator as User).username + '/project/' + res.name
            );
          } else {
            this.router.navigate(['/']);
          }
        },
        (err) => {
          console.error(err), this.router.navigate(['/']);
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }
}
