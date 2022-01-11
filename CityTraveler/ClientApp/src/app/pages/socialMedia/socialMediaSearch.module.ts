import { DefaultTripPreviewComponent } from './../Trip/trip-template/trip-template';
import { UserCommentTemplate } from './userActivity/userCommentTemplate.component';
import { SocialMediaService } from '../../services/socialMediaService';
import { EntertainmentExportModule } from '../../commonModules/entertainment-export.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivityTemplateUserId } from './userActivity/userActivity.component';
import { ReviewTemplate } from './objectReviews/review-template';
import { ReviewByIdComponent } from './reviewById/reviewById.component';
import { SearchEntertainmentsComponent } from '../searchService/searchEntertainments/searchEntertainments.component';
import { SearchTripsComponent } from '../searchService/searchTrips/searchTrips.component';
import { SearchUsersComponent } from '../searchService/searchUsers/searchUsersPage.component';
import { SearchService } from 'src/app/services/searchService';
import { CommentTree } from './objectReviews/comment-tree.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderForSearchComponent } from '../searchService/headerForSearch/headerForSearch.component';
import { UserProfileModule } from '../userProfile/userProfile.module';

@NgModule({
  declarations: [
    ReviewTemplate,
    ActivityTemplateUserId,
    SearchEntertainmentsComponent,
    SearchTripsComponent,
    SearchUsersComponent,
    CommentTree,
    ReviewByIdComponent,
    HeaderForSearchComponent,
    UserCommentTemplate,
    DefaultTripPreviewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    EntertainmentExportModule,
    ReactiveFormsModule,
    UserProfileModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: 'review-by-object-id', component: ReviewTemplate, pathMatch: 'full'},
      { path: 'activity-by-user-id', component: ActivityTemplateUserId, pathMatch: 'full'},
      { path: 'reviewSee/:id', component: ReviewByIdComponent, pathMatch: 'full'},
      { path: 'search/tab1', component: SearchEntertainmentsComponent, pathMatch: 'full'},
      { path: 'search/tab2', component: SearchTripsComponent, pathMatch: 'full'},
      { path: 'search/tab3', component: SearchUsersComponent, pathMatch: 'full'},
    ])
  ],
  providers: [
    SocialMediaService,
    SearchService
  ],
  bootstrap: [
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [
    ReviewTemplate,
    DefaultTripPreviewComponent
  ]
})
export class SocialMediaModule {}
