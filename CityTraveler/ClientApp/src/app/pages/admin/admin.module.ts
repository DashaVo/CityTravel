import { DetailModule } from './detail/detail.module';
import { AdditionalModule } from './additional/additional.module';
import { CardModule } from './card/card.module';
import { EntertainmentDetailComponent } from './detail/entertainment-detail/entertainment-detail.component';
import { TripDetailComponent } from './detail/trip-detail/trip-detail.component';
import { UserDetailComponent } from './detail/user-detail/user-detail.component';
import { StatisticService } from 'src/app/services/statistic.service';
import { ReviewsModule } from './reviewsfilter/reviews.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AdminComponent } from './admin.component';
import { AdminService } from 'src/app/services/admin.service';
import { AddressfilterComponent } from './addressfilter/addressfilter.component';
import { TripfilterComponent } from './tripfilter/tripfilter.component';
import { UserfilterComponent } from './userfilter/userfilter.component';
import { ReviewsfilterComponent } from './reviewsfilter/reviewsfilter.component';
import { UserFilterModule } from './userfilter/userfilter.module';
import { AddressFilterModule } from './addressfilter/addressfilter.module';
import { StatisticComponent } from './statistic/statistic.component';
import { HistoryComponent } from './history/history.component';
import { StatisticModule } from './statistic/statistic.module';
import { EntertainmentModule } from './filterentertainment/filterentertainment.module';
import { FilterentertainmentComponent } from './filterentertainment/filterentertainment.component';
import { TripFilterModule } from './tripfilter/tripfilter.module';
import { InterceptorService } from 'src/app/services/loader/interceptor.service';
import { MatIconModule } from '@angular/material/icon';
import { HistoryService } from 'src/app/services/history.service';
import { ReviewsDetailComponent } from './detail/reviews-detail/reviews-detail.component';
import { NavAdminModule } from './nav-admin/nav.admin.module';



@NgModule({

  declarations: [
    AddressfilterComponent,
    TripfilterComponent,
    ReviewsfilterComponent,
    UserfilterComponent,
    StatisticComponent,
    HistoryComponent,
    FilterentertainmentComponent,

  ],
  imports: [
    RouterModule.forRoot([
        { path: 'admin', redirectTo: 'admin/statistic', pathMatch: 'full' },
        { path: 'admin/statistic', component: StatisticComponent},
        { path: 'admin/review', component: ReviewsfilterComponent },

        { path: 'admin/review/:id', component: ReviewsDetailComponent },
        { path: 'admin/history', component: HistoryComponent },
        { path: 'admin/address', component: AddressfilterComponent },
        { path: 'admin/trip/:id', component: TripDetailComponent },

        { path: 'admin/trip', component: TripfilterComponent },
        { path: 'admin/user', component: UserfilterComponent },
        { path: 'admin/user/profile/:username', component: UserDetailComponent },
        { path: 'admin/entertainment', component: FilterentertainmentComponent },

        { path: 'admin/entertainment/:id', component: EntertainmentDetailComponent },
      ] ),

    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserFilterModule,
    AddressFilterModule,
    BrowserAnimationsModule,
    StatisticModule,
    EntertainmentModule,
    ReviewsModule,
    TripFilterModule,
    InfiniteScrollModule,
    MatIconModule,
    NavAdminModule,
    AdditionalModule,
    CardModule,
    DetailModule
  ],
  providers: [
    AdminService,
    StatisticService,
    HistoryService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }

  ],
  exports:[
    AddressfilterComponent,
    TripfilterComponent,
    ReviewsfilterComponent,
    UserfilterComponent,
    StatisticComponent,
    HistoryComponent,
    FilterentertainmentComponent,
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
