import { AddCommentModel } from './../../../models/comment.model';
import { ReviewModel } from 'src/app/models/review.model';
import { Component, Input, OnInit } from '@angular/core';
import { ICommentModel } from 'src/app/models/comment.model';
import { SocialMediaService } from 'src/app/services/socialMediaService';
import * as defaults from "../../../models/initialValues";

@Component({
  selector: 'comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: [ './comment-tree.component.scss' ]
})
export class CommentTree {

  public request: AddCommentModel = defaults.addComment;
  @Input() public objectId: string;
  @Input() public reviews: ReviewModel[] = [];
  @Input() public userId: string;
  public text: string;
  public isErrorAdding = false;
  public isErrorGettingComments = false;

  constructor(private service:SocialMediaService){}

  changeIsHidden(review: ReviewModel){
    this.service.getCommentsByReviewId(review.id).then((res:ICommentModel[])=>review.comments = res);
    review.isHidden = !review.isHidden
  }

  async addCommentToDatabase(review: ReviewModel) {
    await this.service.addComment(this.request).then((res:string)=>{
      review.addAnwser(new ICommentModel(res, this.text, review.id, 1, this.userId, "admin"));
    })
    .catch(() => {
      this.isErrorAdding = true;
    });
  }
  async getCommentsByReviewId(review: ReviewModel){
    await this.service.getCommentsByReviewId(review.id).
    then((res:ICommentModel[])=> review.comments = res)
    .catch(()=>
    {
      this.isErrorGettingComments = true;
    });
  }

  async addComment(review: ReviewModel) {
    this.request.reviewId = review.id;
    this.request.ownerId = this.userId;
    this.request.status = 1;
    this.addCommentToDatabase(review);
    this.getCommentsByReviewId (review);
    review.isOpen = false;
    this.text = "";
    review.isHidden = false;
  }

  openCommentText(review){
    console.log(review)
    review.isOpen = !review.isOpen;
  }
}
