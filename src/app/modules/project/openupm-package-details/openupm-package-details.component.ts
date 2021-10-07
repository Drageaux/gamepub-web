import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-openupm-package-details',
  templateUrl: './openupm-package-details.component.html',
  styleUrls: ['./openupm-package-details.component.scss'],
})
export class OpenupmPackageDetailsComponent implements OnInit {
  @Input() packageName!: string;
  packageDetails$: Observable<any>;

  constructor(private pkgService: PackageService) {
    this.packageDetails$ = this.pkgService.expandOpenUpmPackageInfo(
      this.packageName
    );
  }

  ngOnInit(): void {}
}
