import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetsRoutesNames } from '@classes/routes.names';
import { AssetsApiService } from '@services/assets-api.service';
import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-asset-proxy',
  templateUrl: './asset-proxy.component.html',
  styleUrls: ['./asset-proxy.component.scss'],
})
export class AssetProxyComponent implements OnInit {
  assetsLink = AssetsRoutesNames.ROOT;
  assetProxyParamName = AssetsRoutesNames.ROOTPROXYPARAMNAME;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assetsApi: AssetsApiService,
    private assetsService: AssetsService
  ) {}

  ngOnInit(): void {
    let puid = this.route.snapshot.paramMap.get(this.assetProxyParamName);

    if (puid) {
      this.assetsService.changeAsset(puid);

      this.assetsService.getAsset().subscribe(
        (res) => {
          if (res && res.creator && res.slug) {
            this.router.navigate([
              '',
              res.creator,
              this.assetsLink,
              res.puid,
              res.slug,
            ]);
          }
        },
        (err) => {
          console.error(err), this.router.navigate(['']);
        }
      );
    }
  }
}
