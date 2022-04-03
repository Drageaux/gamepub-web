import { Injectable } from '@angular/core';
import { Asset } from '@classes/asset';
import { AssetsApiService } from '@services/assets-api.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  private asset$ = new BehaviorSubject<Asset | null>(null);
  private _puid = '';

  constructor(private assetsApi: AssetsApiService) {}

  changeAsset(puid: string) {
    // only update data if null or route actually changed
    if (puid === this._puid) return this.asset$;

    return this.assetsApi.getAssetByPuid(puid).pipe(
      switchMap((asset) => {
        this.asset$.next(asset);
        if (asset) {
          this._puid = puid;
          return this.getAsset();
        } else {
          // TODO: reset asset$
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
