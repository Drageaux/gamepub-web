import { Package } from './../../../classes/package';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { PackageService } from 'src/app/services/package.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-openupm-package-details',
  templateUrl: './openupm-package-details.component.html',
  styleUrls: ['./openupm-package-details.component.scss'],
})
export class OpenupmPackageDetailsComponent implements OnInit {
  @Input() packageName!: string;
  package$?: Observable<Package>;

  constructor(private pkgService: PackageService) {}

  ngOnInit(): void {
    this.package$ = this.pkgService.expandOpenUpmPackageInfo(this.packageName);
  }

  getLatestVersionDetails(pkg: Package) {
    if (pkg) {
      const latestVer = pkg['dist-tags']?.latest;
      if (latestVer && pkg.versions) {
        return pkg.versions[latestVer];
      }
    }
    return null;
  }
}
