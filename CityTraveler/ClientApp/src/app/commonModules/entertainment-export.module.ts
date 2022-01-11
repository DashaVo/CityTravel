import { FindArea } from './../pages/Entertainment/FindArea/findArea.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripPreviewComponent } from '../pages/Entertainment/components/trip/tripPreview.component';
import { EmptyComponent } from '../pages/Entertainment/components/empty/empty.component';
import { RatingComponent } from '../pages/Entertainment/components/rating.component/rating.component';
import { MainImageComponent } from '../pages/Entertainment/components/mainImage/main.image.component';
import { EntertainmentPreviewComponent } from '../pages/Entertainment/entertainmentPreview/entertainment.preview.component';
import { LoadingComponent } from '../pages/Entertainment/components/loading/loading.component';
import { ReviewPreviewComponent } from '../pages/socialMedia/reviewPreview.component/reviewPreview.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TripPreviewComponent,
    EmptyComponent,
    RatingComponent,
    MainImageComponent,
    EntertainmentPreviewComponent,
    LoadingComponent,
    ReviewPreviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TripPreviewComponent,
    EmptyComponent,
    RatingComponent,
    MainImageComponent,
    EntertainmentPreviewComponent,
    LoadingComponent,
    ReviewPreviewComponent,
  ],
  providers: [
    TripPreviewComponent,
    EmptyComponent,
    RatingComponent,
    MainImageComponent,
    EntertainmentPreviewComponent,
    LoadingComponent,
    ReviewPreviewComponent,
  ],
})
export class EntertainmentExportModule { }
