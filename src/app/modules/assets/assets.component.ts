import { SubSink } from 'subsink';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset } from '@classes/asset';
import { AssetsRoutesNames, ProfileRoutesNames } from '@classes/routes.names';
import { Subject, combineLatest } from 'rxjs';
import { map, skipWhile, switchMap, tap } from 'rxjs/operators';
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
    this.subs.sink = combineLatest([
      this.assetsService.getAsset(),
      this.route.params,
    ])
      .pipe(
        tap(([asset, params]) => {
          this.assetsService.changeAsset(params[this.assetParamName]);
          // .subscribe(
          //   (asset) => {
          //     if (asset) {
          //       this.asset = asset;
          //     } else this.noAssetError$.next(true);
          //   },
          //   (err) => this.noAssetError$.next(true)
          // );
          // missing asset param
          // return this.noAssetError$.next(true);
        })
      )
      .subscribe(
        ([asset, params]) => {
          this.asset = asset;
          this.username = params[this.userParamName];
          const routePuid = params[this.assetParamName];
        },
        (error) => {
          this;
        }
      );

    // handle error
    this.subs.sink = this.noAssetError$.subscribe((hasError) => {
      if (hasError) this.router.navigate(['', this.username]);
    });
  }

  ngOnDestroy(): void {
    console.log('assets page on destroy');
    this.subs.unsubscribe();
  }
}
