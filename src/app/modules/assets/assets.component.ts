import { SubSink } from 'subsink';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset } from '@classes/asset';
import { AssetsRoutesNames, ProfileRoutesNames } from '@classes/routes.names';
import { Subject, combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AssetsService } from './assets.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  userParamName = ProfileRoutesNames.PROFILEPARAMNAME;
  assetsLink = AssetsRoutesNames.ASSETS;
  assetParamName = AssetsRoutesNames.ASSETPARAMNAME;
  slugParamName = AssetsRoutesNames.SLUGPARAMNAME;

  username!: string;
  asset!: Asset | null;

  readonly noAssetError$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assetsService: AssetsService
  ) {}

  ngOnInit(): void {
    // watch for changes from both route and shared data
    // NOTE: asset should be null on init
    this.subs.sink = combineLatest([
      this.route.params,
      this.assetsService.getAsset(),
    ])
      .pipe(
        switchMap(([params, asset]) => {
          console.log(asset);
          // used for redirect back to profile page if asset not found
          this.username = params[this.userParamName];
          // only update data if null or route actually changed
          if (asset == null || params[this.assetParamName] !== asset?.puid) {
            return this.assetsService.changeAsset(params[this.assetParamName]);
          } else return of(asset);
        })
      )
      .subscribe(
        (asset) => {
          if (asset) this.asset = asset;
          else this.noAssetError$.next(true);
        },
        (err) => this.noAssetError$.next(true)
      );

    // handle error
    this.subs.sink = this.noAssetError$.subscribe((hasError) => {
      if (hasError) this.router.navigate(['', this.username]);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
