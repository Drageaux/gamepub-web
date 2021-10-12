import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AssetService } from '@services/asset.service';

@Component({
  selector: 'app-asset-dashboard',
  templateUrl: './asset-dashboard.component.html',
  styleUrls: ['./asset-dashboard.component.scss'],
})
export class AssetDashboardComponent implements OnInit {
  form = new FormGroup({
    link: new FormControl(''),
  });

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.assetService.scrapeSite(this.form.get('link')?.value || '');
  }
}
