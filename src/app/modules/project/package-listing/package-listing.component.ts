import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';
import { UnityManifest } from 'src/app/classes/unity-manifest';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EXCLUDED_PACKAGES } from 'src/app/classes/CONSTANTS';
import { PackageName } from 'src/app/classes/package';
import { ScopedRegistry } from 'src/app/classes/scoped-registry';

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
