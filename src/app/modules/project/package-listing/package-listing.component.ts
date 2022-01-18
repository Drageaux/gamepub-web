import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '@services/project.service';
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

  constructor(private projService: ProjectService) {}

  ngOnInit(): void {}

  isOpenUpmRegistry(registry: ScopedRegistry) {
    return registry.url === 'https://package.openupm.com';
  }

  trimPackageList(pkgs: PackageName[]) {
    return pkgs.filter((x) => EXCLUDED_PACKAGES.indexOf(x) == -1);
  }
}
