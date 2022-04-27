import { Component, Input, OnInit } from '@angular/core';
import { Asset } from '@classes/asset';
import { AssetsRoutesNames } from '@classes/routes.names';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.scss'],
})
export class AssetCardComponent implements OnInit {
  assetsLink = AssetsRoutesNames.ASSETS;

  @Input()
  asset!: Asset;

  constructor() {}

  ngOnInit(): void {}

  buildRouterLink(a: Asset): (string | undefined)[] {
    if (!a) return [];
    return ['', a.creator, this.assetsLink, a.puid, a.slug || ''];
  }
}
