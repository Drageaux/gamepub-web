import { Injectable } from '@angular/core';
import { Asset } from '@classes/asset';
import { AssetsApiService } from '@services/assets-api.service';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssetsService {
  private asset$ = new ReplaySubject<Asset | null>(1);
  private _puid = '';

  constructor(private assetsApi: AssetsApiService) {}

  changeAsset(puid: string): void {
    if (puid === this._puid) return;

    this._puid = puid;
    this.assetsApi.getAssetByPuid(this._puid).subscribe(
      (asset) => this.asset$.next(asset),
      (err) => this.asset$.next(null)
    );
  }

  getAsset() {
    return this.asset$.asObservable();
  }
}
