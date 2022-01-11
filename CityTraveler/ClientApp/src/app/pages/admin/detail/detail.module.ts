import { RouterModule } from '@angular/router';
import { ReviewsDetailComponent } from './reviews-detail/reviews-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { EntertainmentDetailComponent } from './entertainment-detail/entertainment-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavAdminModule } from '../nav-admin/nav.admin.module';
import { AdditionalModule } from '../additional/additional.module';
import { CardModule } from '../card/card.module';



@NgModule({
  declarations: [
    EntertainmentDetailComponent,
    TripDetailComponent,
    UserDetailComponent,
    ReviewsDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    NavAdminModule,
    AdditionalModule,
    CardModule
  ],
  exports:[

    EntertainmentDetailComponent,
    TripDetailComponent,
    UserDetailComponent,
    ReviewsDetailComponent
  ]
})
export class DetailModule { }
