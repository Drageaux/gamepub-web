import { Observable } from 'rxjs';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  @Input() owner!: string;
  @Input() repo!: string;
  manifest$!: Observable<UnityManifest>;

  constructor(private projService: ProjectService) {}

  ngOnInit(): void {
    this.manifest$ = this.projService.getManifest(
      this.owner,
      this.repo,
      'Packages'
    );
  }

  isOpenUpmRegistry(registry: ScopedRegistry) {
    return registry.url === 'https://package.openupm.com';
  }

  trimPackageList(pkgs: PackageName[]) {
    return pkgs.filter((x) => EXCLUDED_PACKAGES.indexOf(x) == -1);
  }
}
