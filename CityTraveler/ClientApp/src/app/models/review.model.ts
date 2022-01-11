import { ICommentModel } from "./comment.model";
import { IImageModel } from "./image.model";

export interface AddReviewModel {
  userId: string,
  title: string,
  description: string,
  entertainmentId: string,
  tripId: string,
  images: IImageModel[],
  comments: ICommentModel[],
}

export class ReviewModel {
  id:string = "";
  ratingId: string = "";
  userId: string = "";
  userName: string = "";
  title: string = "";
  description: string = "";
  entertainmentId: string = "";
  tripId: string = "";
  ratingValue: number = 3;
  images: IImageModel[] = [];
  comments: ICommentModel[] = [];
  isOpen: boolean = false;
  isHidden: boolean = true;
  isEditing: boolean = false;
  constructor(id:string, description:string, title:string, ratingValue:number,userName:string, userId:string, images: IImageModel[], ratingId: string)
  {
    this.id = id;
    this.description = description;
    this.title = title;
    this.ratingValue = ratingValue;
    this.userName = userName;
    this.userId = userId;
    this.images = images;
    this.ratingId = ratingId;
  }

  addAnwser(newComment:ICommentModel) {
    if(newComment.description){
      this.comments.push(newComment);
    }
  }

  removeComment(newComment:ICommentModel){
    let index = this.comments.indexOf(newComment);
    if(~index){
      this.comments.slice(index,1);
    }
  }
}
