import { Component, Input, OnInit } from '@angular/core';
import { ProjectApiService } from '@services/project-api.service';
import { EXCLUDED_PACKAGES } from '@classes/CONSTANTS';
import { UnityManifest } from '@classes/unity-manifest';
import { PackageName } from '@classes/package';
import { ScopedRegistry } from '@classes/scoped-registry';

@Component({
  selector: 'app-package-listing',
  templateUrl: './package-listing.component.html',
  styleUrls: ['./package-listing.component.scss'],
})
export class PackageListingComponent implements OnInit {
  @Input() manifest!: UnityManifest;

  constructor(private projectApi: ProjectApiService) {}

  ngOnInit(): void {}

  isOpenUpmRegistry(registry: ScopedRegistry) {
    return registry.url === 'https://package.openupm.com';
  }

  trimPackageList(pkgs: PackageName[]) {
    // exclude packages like openupm since its in every openupm package
    return pkgs.filter((x) => EXCLUDED_PACKAGES.indexOf(x) == -1);
  }
}
