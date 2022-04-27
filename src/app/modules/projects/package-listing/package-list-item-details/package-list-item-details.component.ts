import { Package, VersionName } from '@classes/package';
import { Observable, of } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { PackagesService } from '@services/packages.service';
import { RegistryEnum } from '@classes/CONSTANTS';

@Component({
  selector: 'app-package-list-item-details',
  templateUrl: './package-list-item-details.component.html',
  styleUrls: ['./package-list-item-details.component.scss'],
})
export class OpenupmPackageDetailsComponent implements OnInit {
  RegistryEnum = RegistryEnum;

  @Input() packageName!: string;
  @Input() sourceOrVersion?: string;
  @Input() registry: RegistryEnum | string = RegistryEnum.UNITY;
  package$?: Observable<Package | null>;

  constructor(private pkgsService: PackagesService) {}

  ngOnInit(): void {
    if (this.sourceOrVersion?.startsWith('https://github.com')) {
      // TODO: support rendering for GitHub packages
    }
    switch (this.registry) {
      case RegistryEnum.UNITY:
        this.package$ = this.pkgsService.expandUnityRegistryPackageInfo(
          this.packageName
        );
        break;
      case RegistryEnum.OPENUPM:
        this.package$ = this.pkgsService.expandOpenUpmPackageInfo(
          this.packageName
        );
        break;
      default:
        this.package$ = of({ name: this.packageName });
        break;
    }
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

  getMinorVersion(version: VersionName) {
    const match = version.match(
      /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
    );
    console.log(match);
    if (match && match[1] && match[2]) {
      return match[1] + '.' + match[2];
    }
    return null;
  }
}
