import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchReviewComponent } from './search-review/search-review.component';
import { ReviewsfilterComponent } from './reviewsfilter.component';
import { CardReviewComponent } from '../card/card-review/card-review.component';
import { ReviewsDetailComponent } from '../detail/reviews-detail/reviews-detail.component';
import { NavAdminModule } from '../nav-admin/nav.admin.module';



@NgModule({
  declarations: [
    SearchReviewComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    NavAdminModule
  ],
  exports:[
    SearchReviewComponent,
  ],
  bootstrap:[ReviewsfilterComponent

  ]
})
export class ReviewsModule { }
