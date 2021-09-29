import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-asset-dashboard',
  templateUrl: './asset-dashboard.component.html',
  styleUrls: ['./asset-dashboard.component.scss'],
})
export class AssetDashboardComponent implements OnInit {
  link = new FormControl('');

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.assetService.scrapeSite(this.link.value);
  }
}
