import { Component, Input, OnInit } from '@angular/core';
import { ProjectsApiService } from '@services/projects-api.service';
import { EXCLUDED_PACKAGES, RegistryEnum } from '@classes/CONSTANTS';
import {
  UnityManifest,
  PackageToSourceMapping,
  VersionOfPackageMapping,
} from '@classes/unity-manifest';
import { PackageName } from '@classes/package';
import { ScopedRegistry } from '@classes/scoped-registry';

@Component({
  selector: 'app-package-listing',
  templateUrl: './package-listing.component.html',
  styleUrls: ['./package-listing.component.scss'],
})
export class PackageListingComponent implements OnInit {
  RegistryEnum = RegistryEnum;
  @Input() manifest!: UnityManifest;
  showBuiltinUnityPackages = false;
  regularUnityPackages: VersionOfPackageMapping = {};
  builtinUnityPackages: VersionOfPackageMapping = {};
  githubPackages: PackageToSourceMapping = {};

  constructor(private projectsApi: ProjectsApiService) {}

  ngOnInit(): void {
    Object.entries(this.manifest.dependencies).forEach(([name, version]) => {
      if (name.startsWith('com.unity.modules')) {
        this.builtinUnityPackages[name] = version;
      } else if (version.startsWith('https://github.com/')) {
        this.githubPackages[name] = version;
      } else {
        this.regularUnityPackages[name] = version;
      }
    });
    console.log(this.regularUnityPackages);
  }

  isOpenUpmRegistry(registry: ScopedRegistry) {
    return registry.url === 'https://package.openupm.com';
  }

  trimPackageList(pkgs: PackageName[]) {
    // exclude packages like openupm since its in every openupm package
    return pkgs.filter((x) => EXCLUDED_PACKAGES.indexOf(x) == -1);
  }
}
