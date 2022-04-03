import { SubSink } from 'subsink';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset } from '@classes/asset';
import { AssetsRoutesNames, ProfileRoutesNames } from '@classes/routes.names';
import { Subject, combineLatest, throwError } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  map,
  skipWhile,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
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
    this.route.params
      .pipe(
        distinctUntilKeyChanged(this.assetParamName),
        switchMap((params) => {
          return this.assetsService.changeAsset(params[this.assetParamName]);
        })
      )
      .subscribe((asset) => {
        if (asset) this.asset = asset;
        else this.noAssetError$.next(true);
      });

    // handle error
    this.subs.sink = this.noAssetError$.subscribe((hasError) => {
      if (hasError) this.router.navigate(['', this.username]);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
