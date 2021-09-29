import { Injectable } from '@angular/core';
import openGraphScraper from 'ts-open-graph-scraper';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  ogs = openGraphScraper;
  constructor() {}

  async scrapeSite(siteUrl: string) {
    console.log(siteUrl);
    await this.ogs(
      {
        url: siteUrl,
      }
      // (error: any, results: any, response: any) => {
      //   console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
      //   console.log('results:', results); // This contains all of the Open Graph results
      //   console.log('response:', response); // This contains the HTML of page)
      // }
    );
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
