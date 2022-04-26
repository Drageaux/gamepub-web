import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { ProgressiveImageComponent } from './progressive-image/progressive-image.component';
import { ProgressiveImageDirective } from './progressive-image/progressive-image.directive';
import { UploadComponent } from '@components/upload/upload.component';

import { FileSizePipe } from './file-size.pipe';

import { DateAgoPipe } from '@modules/shared/date-ago.pipe';
import { SortPipe } from './sort.pipe';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { RouterModule } from '@angular/router';
import { AssetCardComponent } from './components/asset-card/asset-card.component';

@NgModule({
  declarations: [
    UploadComponent,
    FileSizePipe,
    DateAgoPipe,
    SortPipe,
    ProgressiveImageComponent,
    ProgressiveImageDirective,
    ProjectCardComponent,
    AssetCardComponent,
  ],
  exports: [
    UploadComponent,
    FileSizePipe,
    DateAgoPipe,
    SortPipe,
    ProgressiveImageComponent,
    ProgressiveImageDirective,
    ProjectCardComponent,
    AssetCardComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [],
})
export class SharedModule {}
