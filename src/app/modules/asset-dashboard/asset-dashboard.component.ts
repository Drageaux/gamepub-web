import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AssetsService } from '@services/assets.service';

@Component({
  selector: 'app-asset-dashboard',
  templateUrl: './asset-dashboard.component.html',
  styleUrls: ['./asset-dashboard.component.scss'],
})
export class AssetDashboardComponent implements OnInit {
  form = new FormGroup({
    link: new FormControl(''),
  });

  constructor(private assetsService: AssetsService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.assetsService.scrapeSite(this.form.get('link')?.value || '');
  }
}
