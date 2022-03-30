import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Asset } from '@classes/asset';
import { ProjectsRoutesNames } from '@classes/routes.names';
import { AssetsApiService } from '@services/assets-api.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss'],
})
export class CreateAssetComponent implements OnInit {
  private subs = new SubSink();
  projectsLink = ProjectsRoutesNames.ROOT;

  assetForm = new FormGroup({
    githubRepo: new FormControl(''),
  });
  @ViewChild('form') form!: NgForm;

  constructor(private apiService: AssetsApiService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { githubRepo } = this.assetForm.value;
    this.subs.sink = this.apiService
      .create({
        githubRepo: githubRepo.trim(),
      } as Asset)
      .subscribe(
        (res: Asset) => {
          // navigate
        },
        (err) => {
          // resetForm also resets the submitted status, while reset() doesn't
          this.form.resetForm(this.assetForm.value);
          console.error(err);
        }
      );
  }
}
