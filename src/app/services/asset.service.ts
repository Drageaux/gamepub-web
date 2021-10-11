import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import normalizeUrl from 'normalize-url';

import { BehaviorSubject, from } from 'rxjs';
import { map, distinct, filter, mergeMap } from 'rxjs/operators';
import { Package } from '../classes/package';

/**
 * Web scraper credit: https://dev.to/jacobgoh101/simple--customizable-web-scraper-using-rxjs-and-node-1on7
 */
@Injectable({
  providedIn: 'root',
})
export class AssetService {
  baseUrl = `https://assetstore.unity.com/`;
  allUrl$ = new BehaviorSubject(this.baseUrl);
  uniqueUrl$ = this.allUrl$.pipe(
    // only crawl base url
    filter((url) => url.includes(this.baseUrl)),
    // normalize url for comparison
    map((url) => normalizeUrl(url, { removeQueryParameters: ['ref', 'ref_'] })),
    // distinct is a RxJS operator that filters out duplicated values
    distinct()
  );

  constructor(private http: HttpClient) {}

  scrapeSite(siteUrl: string) {
    // const urlAndDOM$ = this.uniqueUrl$.pipe(
    //   // mergeMap((url) => {
    //   //   return this.http.get(url);
    //   // })
    //   map((siteUrl) => this.http.get(siteUrl))
    // );

    // urlAndDOM$.subscribe(console.log);
    console.log(siteUrl);
    let proxyUrl = siteUrl.startsWith('https://packages.unity.com')
      ? '/registry/unity'
      : '/registry/openupm';

    this.http
      .get<Package>('/registry/unity/com.unity.2d.animation')
      // .get(
      //   '/asset/unity/packages/3d/props/polygon-shops-pack-low-poly-3d-art-by-synty-199026'
      // )
      .subscribe((res: Package) => {
        const latestVer = res['dist-tags']?.latest;
        if (latestVer && res.versions) {
          console.log(res.versions[latestVer]);
        }
      }, console.error);
  }

  private isValidURL(url: string) {
    var RegExp =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if (RegExp.test(url)) {
      return true;
    } else {
      return false;
    }
  }
}
