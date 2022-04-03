import { Injectable } from '@angular/core';
import { Asset } from '@classes/asset';
import { AssetsApiService } from '@services/assets-api.service';
import { BehaviorSubject, of, ReplaySubject, Subject, throwError } from 'rxjs';
import { distinctUntilChanged, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  private asset$ = new ReplaySubject<Asset | null>(1);
  private _puid = '';
  counter = 0;
  private loading$ = new BehaviorSubject<boolean>(false);

  constructor(private assetsApi: AssetsApiService) {}

  changeAsset(puid: string) {
    this.counter++;
    console.log({ counter: this.counter });
    console.log('service current id', puid);
    // if (puid === this._puid) return of(null);

    this.loading$.next(true);
    return this.assetsApi
      .getAssetByPuid(puid)
      .pipe(tap((asset) => this.asset$.next(asset)));
  }

  getAsset() {
    return this.asset$;
  }
}
