import { ProjectsService } from '../projects.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsApiService } from '@services/jobs-api.service';
import { SubSink } from 'subsink';
import { JobComment } from '@classes/job-comment';
import { Job } from '@classes/job';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { JobSubmission } from '@classes/job-submission';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
