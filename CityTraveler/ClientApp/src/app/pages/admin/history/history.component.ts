import { SocialMediaService } from 'src/app/services/socialMediaService';
import { Component, OnInit } from '@angular/core';
import { ICommentPreview } from 'src/app/models/comment.model';
import { IReviewPreviewModel } from 'src/app/models/reviewPreview.model';
import { HistoryService } from 'src/app/services/history.service';
import { IAdminTripPreview } from 'src/app/models/filters/trip.admin.model';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  comment1:ICommentPreview;
  review1: IReviewPreviewModel;
  comment2:ICommentPreview;
  review2: IReviewPreviewModel;
  trip: IAdminTripPreview;
  constructor(private historyservice: HistoryService,private social: SocialMediaService) { }

  async ngOnInit() {
    this.comment1 = await this.historyservice.GetLastComment();
    this.review1 = await this.social.getReview(this.comment1.reviewId);
    this.comment2 = await this.historyservice.GetLastUserComment( "admin@admin.admin");
    this.review2 = await this.social.getReview(this.comment2.reviewId);
    this.trip = await this.historyservice.GetLastTrip();
  }
 

}
