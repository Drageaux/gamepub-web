import { Injectable } from '@angular/core';
import { Asset } from '@classes/asset';
import { AssetsApiService } from '@services/assets-api.service';
import { BehaviorSubject, of, ReplaySubject, Subject, throwError } from 'rxjs';
import {
  distinctUntilChanged,
  catchError,
  tap,
  map,
  switchMap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  private asset$ = new BehaviorSubject<Asset | null>(null);
  private _puid = '';
  counter = 0;

  constructor(private assetsApi: AssetsApiService) {}

  changeAsset(puid: string) {
    this.counter++;
    console.log({ counter: this.counter });
    console.log('service current id', puid);
    // only update data if null or route actually changed
    if (puid === this._puid) return this.asset$;

    return this.assetsApi.getAssetByPuid(puid).pipe(
      switchMap((asset) => {
        this.asset$.next(asset);
        if (asset) {
          this._puid = puid;
          return this.getAsset();
        } else {
          // TODO: reset asset
          this._puid = '';
          throw new Error('Asset not found');
        }
      })
    );
  }

  getAsset() {
    return this.asset$.asObservable();
  }
}
