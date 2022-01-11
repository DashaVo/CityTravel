export interface AddCommentModel
{
    reviewId: string,
    status: number,
    description: string,
    ownerId: string,
    name: string;
}
export class ICommentModel {
  id:string;
  ownerId: string;
  isOpen:false;
  reviewId: string;
  status: number;
  description: string;
  name: string;
  isEditing: boolean = false;

  constructor(id:string, text:string, reviewId:string,status:number,userId:string, userName: string){
    this.id = id;
    this.description = text;
    this.reviewId = reviewId;
    this.status = status;
    this.ownerId = userId;
    this.name = userName;
  }
}
export class ICommentPreview{
  id: string;
  ownerId: string;
  reviewId:string;
  status: 0;
  description: string;
}