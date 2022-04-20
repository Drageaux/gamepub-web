import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Asset } from '@classes/asset';
import { AssetsRoutesNames, ProjectsRoutesNames } from '@classes/routes.names';
import { AssetsApiService } from '@services/assets-api.service';
import { noWhitespaceValidator } from 'src/app/utils/no-whitespace.validator';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss'],
})
export class CreateAssetComponent implements OnInit {
  private subs = new SubSink();
  assetsLink = AssetsRoutesNames.ROOT;

  assetForm = new FormGroup({
    displayName: new FormControl('', [
      noWhitespaceValidator,
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    githubRepo: new FormControl('', [Validators.required]),
  });
  @ViewChild('form') form!: NgForm;

  get displayName() {
    return this.assetForm.get('displayName');
  }

  constructor(private apiService: AssetsApiService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { displayName, githubRepo } = this.assetForm.value;
    this.subs.sink = this.apiService
      .create({
        displayName: displayName.trim(),
        githubRepo: githubRepo.trim(),
      } as Asset)
      .subscribe(
        (res: Asset) => {
          // navigate
          const { creator, puid, slug } = res;
          if (res && creator && puid && slug) {
            this.router.navigate(['', creator, this.assetsLink, puid, slug]);
          } else {
            this.router.navigate(['', this.assetsLink, res?.puid]);
          }
        },
        (err) => {
          // resetForm also resets the submitted status, while reset() doesn't
          this.form.resetForm(this.assetForm.value);
          console.error(err);
        }
      );
  }
}
