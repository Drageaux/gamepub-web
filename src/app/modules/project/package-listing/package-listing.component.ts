import { UnityManifest } from 'src/app/classes/unity-manifest';
import { Component, Input, OnInit } from '@angular/core';
import { EXCLUDED_PACKAGES } from 'src/app/classes/CONSTANTS';
import { PackageName } from 'src/app/classes/package';
import { ScopedRegistry } from 'src/app/classes/scoped-registry';

@Component({
  selector: 'app-package-listing',
  templateUrl: './package-listing.component.html',
  styleUrls: ['./package-listing.component.scss'],
})
export class PackageListingComponent implements OnInit {
  @Input() manifest: UnityManifest = {
    dependencies: {},
  };

  constructor() {}

  ngOnInit(): void {}

  isOpenUpmRegistry(registry: ScopedRegistry) {
    return registry.url === 'https://package.openupm.com';
  }

  trimPackageList(pkgs: PackageName[]) {
    return pkgs.filter((x) => EXCLUDED_PACKAGES.indexOf(x) == -1);
  }
}
