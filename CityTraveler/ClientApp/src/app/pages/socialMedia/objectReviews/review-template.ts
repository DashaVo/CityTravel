import { ReviewModel } from 'src/app/models/review.model';
import { SocialMediaService } from 'src/app/services/socialMediaService';
import { Component, Input, OnInit } from "@angular/core";
import { IReviewPreviewModel } from 'src/app/models/reviewPreview.model';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/generalServices/auth.service';
import { AddReviewModalDialogComponent } from 'src/app/modals/socialmedia/addReview.modal';
import { SignupOrSigninModalDialogComponenet } from 'src/app/modals/signInOrSignUp/signInOrSignUp';

@Component({
    selector: 'ngbd-rating-template',
    templateUrl: './review-template.html',
    styleUrls: ['./review-template.scss']
  })

  export class ReviewTemplate implements OnInit{
    public reviews : ReviewModel[] = [];
    public isOpenReview = false;
    public text = "";
    public isError = false;
    public currentRate = 3;
    @Input() public objectId: string;
    @Input() public userId: string;
    public isReadyToShow = false;
    public isLoggedIn: boolean = false;

  constructor(private service: SocialMediaService,
    private authService: AuthService,
    private dialog: MatDialog){
  }

  async getUser() {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user.id;
      this.isLoggedIn=true;
    }
  }

  async ngOnInit(){
    this.isReadyToShow = true;
    await this.getUser();
  }

  public async init() {
  await this.service.getObjectReviews(this.objectId, 0, 9)
    .then((res: IReviewPreviewModel[]) => {
      res.forEach((element) => {
      const reviewToClass = new ReviewModel(element.id, element.description, element.title,element.ratingValue,element.name,element.userId, element.images, element.ratingId);
      this.reviews.push(reviewToClass);
    })
  })
  .catch((error) => {
    console.error(error);
    this.isError = true;
  });
  }

  openCommentText() {
    this.isOpenReview = true;
  }

  openDialog(){
    if (this.isLoggedIn) {
      this.dialog.open(AddReviewModalDialogComponent, {
        panelClass: 'dialog-modal',
        data: {
          objectIdE: this.objectId,
          rate: this.currentRate,
          userIdE: this.userId,
          isTripT: true,
        }
      });
    } else {
      this.openSignUpOrSigninModal();
    }
  }

  openSignUpOrSigninModal():void{
    if (!this.isLoggedIn) {
      this.dialog.open(SignupOrSigninModalDialogComponenet, {
        panelClass: 'dialog-modal',
        data:{}
      });
    }
  }
}
