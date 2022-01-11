
import { IReviewPreviewModel } from 'src/app/models/reviewPreview.model';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IFilterAdminReviews } from 'src/app/models/filters/filterReviews.admin';
import { IAdminReviewPreview } from 'src/app/models/filters/trip.admin.model';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'reviewsfilter',
  templateUrl: './reviewsfilter.component.html',
  styleUrls: ['./reviewsfilter.component.scss'],
})
export class ReviewsfilterComponent implements OnInit{
  sum = 0;
  throttle = 150;
  scrollDistance = 1;
  reviews: IAdminReviewPreview[]=[];
  filter:IFilterAdminReviews={
    title: "",
    description: "",
    ratingLess: 5,
    ratingMore: 0,
    user:""
  }
  constructor(private service: AdminService) {  }

 async ngOnInit() {
    await this.FilterReviews(this.filter,0,10);
  }

  async onScrollDown(ev) {
    console.log("scrolled down!!", ev);
    this.sum += 10;
    this.reviews = [...this.reviews,...await this.service.FilterReviews(this.filter,this.sum,10)];
  }
  async FilterReviews($event : IFilterAdminReviews,skip:number,take:number){

    this.filter=$event;
    this.sum=0;
    this.reviews = await this.service.FilterReviews(this.filter,skip,take);
console.log(this.reviews);
  }
}
