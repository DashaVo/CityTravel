
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DeleteModalDialogComponent } from 'src/app/modals/delete/delete.modal';
import { SocialMediaService } from 'src/app/services/socialMediaService';
import { IReviewPreviewModel } from 'src/app/models/reviewPreview.model';
import { ICommentModel } from 'src/app/models/comment.model';

@Component({
  selector: 'app-reviews-detail',
  templateUrl: './reviews-detail.component.html',
  styleUrls: ['./reviews-detail.component.css']
})
export class ReviewsDetailComponent implements OnInit {

  reviewId: string;
  review:IReviewPreviewModel;
  comments: ICommentModel[] = [];

  constructor(public dialog: MatDialog,private service: SocialMediaService, private route: ActivatedRoute) { }

  
  openDeleteModal(): void {
    
    const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
      width: '300px',
      panelClass: 'dialog-modal',
      data: { email: '', password: '', isPersistent: false }
    });
    dialogRef.afterClosed().subscribe(async (result: boolean) => {
     if(result){
       this.service.deleteReview(this.reviewId);
     }
     console.log("delete item id ",result)
    });
    window.scroll(0, 0);
  }
  async ngOnInit() {
    this.route.paramMap.subscribe(
        param => { let id =  param.get('id');
        console.log(id)
        this.reviewId = id;
       })
        this.review = await this.service.getReview(this.reviewId);
        console.log("q",this.review)
        this.comments = await this.service.getCommentsByReviewId(this.reviewId);
        console.log(this.comments);
  }
  
}
