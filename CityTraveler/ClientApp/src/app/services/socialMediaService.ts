import { IImageModel } from './../models/image.model';
import { AddCommentModel } from './../models/comment.model';
import { ICommentModel } from 'src/app/models/comment.model';
import { IRating } from './../models/rating.model';
import { ApiService } from './generalServices/api.service';
import { Injectable } from "@angular/core";
import { AddReviewModel, ReviewModel } from "../models/review.model";
import { IReviewPreviewModel } from '../models/reviewPreview.model';
import { AddReviewImageModel } from '../models/reviewImage.model';

@Injectable()
export class SocialMediaService {

    constructor(private service: ApiService) {}
    getCommentsByReviewId(reviewId: string): Promise<ICommentModel[]>{
      return this.service.get(`/api/socialmedia/comments?reviewId=${reviewId}`);
    }
    getObjectReviews(objectId:string, skip:number, take:number): Promise<IReviewPreviewModel[]> {
        return this.service.get(`/api/socialmedia/object-reviews?id=${objectId}&skip=${skip}&take=${take}`);
    }

    getReview(reviewId: string) : Promise<IReviewPreviewModel> {
        return this.service.get(`/api/socialmedia/id?reviewId=${reviewId}`);
    }
    getReviewsByUserId(userId: string) :Promise<IReviewPreviewModel[]> {
      return this.service.get(`/api/socialmedia/user-id-dapper?userId=${userId}`);
    }
    getCommentsByUserId(userId: string) :Promise<ICommentModel[]> {
      return this.service.get(`/api/socialmedia/comments-by-user?userId=${userId}`);
    }
    getRating(rating: string) : Promise<IRating> {
      return this.service.get(`/api/socialmedia/rating?id=${rating}`);
    }

    addReviewTrip(review: AddReviewModel) : Promise<ReviewModel>{
        return this.service.post(`/api/socialmedia/review-trip`,review,false,false);
    }

    addReviewEnetrtainment(review: AddReviewModel): Promise<ReviewModel>{
        return this.service.post(`/api/socialmedia/review-entertainment`, review,false,false);
    }
    addRating(rating: IRating): Promise<string>{
        return this.service.post(`/api/socialmedia/rating`, rating,false,false);
    }
    addImage(image: AddReviewImageModel): Promise<string>{
      return this.service.post(`/api/socialmedia/image`, image, false, false);
    }

    deleteReview(review: string):Promise<boolean>{
        return this.service.delete(`/api/socialmedia/review?reviewId=${review}`);
    }

    deleteComment(commentId: string):Promise<boolean>{
        return this.service.delete(`/api/socialmedia/comment?commentId=${commentId}`);
    }

    deleteImage(imageId: string): Promise<boolean> {
      return this.service.delete(`/api/socialmedia/image?id=${imageId}`);
    }

    deleteRating(ratingId: string): Promise<boolean> {
      return this.service.delete(`/api/socialmedia/rating?id=${ratingId}`);
    }
    addComment(comment:AddCommentModel): Promise<string>{
      return this.service.post(`/api/socialmedia/comment`, comment,false,false);
    }
    updateReview(review:ReviewModel){
      return this.service.put(`/api/socialmedia/review`, review, false,false);
    }
    updateComment(comment:ICommentModel){
      return this.service.put(`/api/socialmedia/comment`, comment, false,false);
    }
    getImagesByReviewId(reviewId:string) : Promise<IImageModel[]>
    {
      return this.service.get(`/api/socialmedia/images?reviewId=${reviewId}`);
    }
}
