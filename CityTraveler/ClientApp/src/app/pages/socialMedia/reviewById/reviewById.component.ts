import { IImageModel } from './../../../models/image.model';
import { IReviewPreviewModel } from 'src/app/models/reviewPreview.model';
import { Component, Input} from '@angular/core';
import { AddCommentModel, ICommentModel } from 'src/app/models/comment.model';
import { ReviewModel } from 'src/app/models/review.model';
import { SocialMediaService } from 'src/app/services/socialMediaService';
import { ActivatedRoute } from '@angular/router';
import * as defaults from "../../../models/initialValues";

@Component({
  selector: 'review',
  templateUrl: './reviewById.component.html',
  styleUrls: ['./reviewById.component.scss']
})

export class ReviewByIdComponent {
    public comments : ICommentModel[] = [];
    @Input() public userId: string = '70A12145-1CEC-4A37-CADD-08D9C1579030';
    public reviewToClass: ReviewModel;
    public id: string;
    public text:string = "";
    public isReadyToShow = false;
    public isError = false;
    public request: AddCommentModel = defaults.addComment;

  constructor(private service: SocialMediaService, private route: ActivatedRoute){
    this.init();
  }

  async init()
  {
    await this.route.queryParams.subscribe(async (params) => {
      this.id = params['id'];
      await this.getById();
      this.reviewToClass;
      this.isReadyToShow = true;
    });
  }

  async getById()
  {
    await this.service.getReview(this.id).then(async (res: IReviewPreviewModel)=>{
      this.reviewToClass = new ReviewModel(res.id, res.description,res.title,res.ratingValue,res.name,res.userId, res.images, res.ratingId)
      this.reviewToClass.isHidden = true;
    }).catch(
      ()=>{this.isError = true;}
      );
  }

  changeIsHidden() {
    this.service.getCommentsByReviewId(this.reviewToClass.id).then((res:ICommentModel[])=>this.reviewToClass.comments = res);
    this.reviewToClass.isHidden = !this.reviewToClass.isHidden
  }

  async addComment() {
    this.request.reviewId = this.reviewToClass.id;
    this.request.ownerId = this.userId;
    this.request.status = 1;
    await this.service.addComment(this.request).then((res:string)=>{
      this.reviewToClass.addAnwser(new ICommentModel(res, this.text, this.reviewToClass.id, 1,this.userId, "admin"));
    })
    .catch(()=>
    {
      this.isError = true;
    });
    this.text = "";
    this.service.getCommentsByReviewId(this.reviewToClass.id).then((res:ICommentModel[])=>this.reviewToClass.comments = res);
    this.reviewToClass.isHidden = false;
    this.reviewToClass.isOpen = false;
  }
  openCommentText(review) {
    console.log(review)
    review.isOpen = !review.isOpen;
  }
  public trackItem(index: number, item: ICommentModel) {
    return item.id;
  }
}
