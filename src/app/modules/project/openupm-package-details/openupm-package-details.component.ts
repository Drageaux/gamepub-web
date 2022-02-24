import { Package } from '@classes/package';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { PackagesService } from '@services/packages.service';

@Component({
  selector: 'app-openupm-package-details',
  templateUrl: './openupm-package-details.component.html',
  styleUrls: ['./openupm-package-details.component.scss'],
})
export class OpenupmPackageDetailsComponent implements OnInit {
  @Input() packageName!: string;
  package$?: Observable<Package>;

  constructor(private pkgsService: PackagesService) {}

  ngOnInit(): void {
    this.package$ = this.pkgsService.expandOpenUpmPackageInfo(this.packageName);
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
