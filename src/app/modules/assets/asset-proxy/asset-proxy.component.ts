import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetsRoutesNames } from '@classes/routes.names';
import { AssetsApiService } from '@services/assets-api.service';
import { skipWhile, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-asset-proxy',
  templateUrl: './asset-proxy.component.html',
  styleUrls: ['./asset-proxy.component.scss'],
})
export class AssetProxyComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  assetsLink = AssetsRoutesNames.ROOT;
  assetProxyParamName = AssetsRoutesNames.ROOTPROXYPARAMNAME;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assetsService: AssetsService
  ) {}

  ngOnInit(): void {
    let puid = this.route.snapshot.paramMap.get(this.assetProxyParamName);
    console.log('proxying:', puid);

    if (puid) {
      this.assetsService.changeAsset(puid).subscribe(
        (res) => {
          if (res && res.creator && res.slug) {
            this.router.navigate([
              '',
              res.creator,
              this.assetsLink,
              res.puid,
              res.slug,
            ]);
          } else {
            this.router.navigate(['']);
          }
        },
        (err) => {
          console.error(err);
          this.router.navigate(['']);
        }
      );
    }
  }

  // unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
