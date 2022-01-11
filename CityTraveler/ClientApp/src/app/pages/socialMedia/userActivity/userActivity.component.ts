import { SocialMediaService } from 'src/app/services/socialMediaService';
import { Component, Input } from "@angular/core";
import { ICommentModel } from 'src/app/models/comment.model';
import { ReviewModel } from 'src/app/models/review.model';
import { IReviewPreviewModel } from 'src/app/models/reviewPreview.model';
import { IImageModel } from 'src/app/models/image.model';
import { ImageSnippet } from 'src/app/modals/socialmedia/addReview.modal';
import { AddReviewImageModel } from 'src/app/models/reviewImage.model';

@Component({
    selector: 'review-user',
    templateUrl: './userActivity.component.html',
    styleUrls: ['./userActivity.component.scss']
  })

  export class ActivityTemplateUserId {
    public comments : ICommentModel[] = [];
    @Input() public userId: string = '556E6652-0F19-4BC9-19A5-08D9C9E4B582';
    public reviews: ReviewModel[] = [];
    public isError = false;
    public photoCount = 6;
    public errorMessage: string = "";
    public result: string;

  constructor(private service: SocialMediaService) {
    (async () => {
      await this.init();
    })();
  }

  async init()
  {
    await this.getComments().then(() => this.getReviews());
  }

  async getComments() {
   return await this.service.getCommentsByUserId(this.userId)
    .then((res: ICommentModel[]) => {
      res.forEach(element => {
        const comment = new ICommentModel(element.id, element.description,element.reviewId,element.status,element.ownerId, element.name);
        this.comments.push(comment);
      });
    })
    .catch((error) => {
      this.errorMessage = error;
      console.error(error);
      this.isError = true;
    });
  }

//consider using pipe
  async getReviews() {
   return await this.service.getReviewsByUserId(this.userId)
    .then((res: IReviewPreviewModel[]) => {
      res.forEach(async (element) => {
          const review = new ReviewModel(element.id, element.description, element.title,element.ratingValue,element.name,element.userId, element.images, element.ratingId);
          this.reviews.push(review);
        })
      })
      .catch(() => {
        this.isError = true;
      });
  }

  deleteReview(reviewId: string) {
    this.service.deleteReview(reviewId)
    .then(() => {
      this.reviews = this.reviews.filter(x => x.id !== reviewId);
    })
    .catch(()=>{this.isError = true;});;
  }

  editReview(review: ReviewModel) {
    this.service.updateReview(review).then(() => {
      this.reviews = this.reviews.filter(x => x.id !== review.id);
      this.reviews.push(review);
      review.isEditing = false;
    })
    .catch(()=>{this.isError = true;});
  }

  deleteComment(commentId : string) {
    this.service.deleteComment(commentId).then(() => {
      this.comments = this.comments.filter(x => x.id !== commentId);
    })
    .catch(()=>{this.isError = true;});
  }

  editComment(comment: ICommentModel) {
    this.service.updateComment(comment).then(() => {
      this.comments = this.comments.filter(x => x.id !== comment.id);
      this.comments.push(comment);
      comment.isEditing = false;
    })
    .catch(()=>{this.isError = true;});
  }

  openEditingWindow(comment: ICommentModel) {
    comment.isEditing = (!comment.isEditing);
  }

  public trackItem(item: ICommentModel) {
    return item.id;
  }

  openEditingWindowReview(review: ReviewModel) {
    review.isEditing = (!review.isEditing);
  }

  public trackItemReview(item: ReviewModel) {
    return item.id;
  }

  deleteImage(reviewId: string, imageId: string) {
    this.service.deleteImage(imageId).then(() => {
      const review =  this.reviews.filter(x => x.id === reviewId)[0];
      review.images = review.images.filter(x => x.id !== imageId);
    })
    .catch(()=>{
      this.isError = true;
    });
  }

  processFile(imageInput: any, review: ReviewModel) {
    const indexes = Object.keys(imageInput.files);
    indexes.forEach((index) => {
      const file = imageInput.files[index];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', (event: any) => {
        var loadedFile = new ImageSnippet(event.currentTarget.result, file);
        if (!review.images.find(x => x.source === loadedFile.src) && review.images.length < this.photoCount + 1) {
          const value = {source: loadedFile.src, title: "image for edited review" } as IImageModel;
          const reviewImage = {source: loadedFile.src, title: "image for edited review", reviewId: review.id} as AddReviewImageModel;
          value.id = this.addImage(reviewImage);
          review.images.push(value);
        }
      });
    });
  }

  addImage(image: AddReviewImageModel) : string
  {
    this.service.addImage(image)
    .catch(()=>{
      this.isError = true;
      })
      .then((res: string)=>{
        this.result = res;
        });
    return this.result;
  }
}
