import { Injectable } from '@angular/core';
import { Asset } from '@classes/asset';
import { AssetsApiService } from '@services/assets-api.service';
import { BehaviorSubject, of, ReplaySubject, Subject, throwError } from 'rxjs';
import { distinctUntilChanged, catchError } from 'rxjs/operators';

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
    this.assetsApi.getAssetByPuid(puid).subscribe(
      (res) => {
        if (res) {
          this._puid = puid;
          this.asset$.next(res);
        } else {
          this._puid = '';
          this.asset$.next(null);
        }
        this.loading$.next(false);
      },
      (err) => {
        this._puid = '';
        this.asset$.next(null);
        this.loading$.next(false);
      }
    );

    return this.loading$.asObservable();
  }

  getAsset() {
    return this.asset$;
  }
}
