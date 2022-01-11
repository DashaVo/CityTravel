import { AddReviewModel } from './../../models/review.model';
import { SocialMediaService } from './../../services/socialMediaService';
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReviewModel } from 'src/app/models/review.model';
import * as defaults from "../../models/initialValues";
import { IImageModel } from "../../models/image.model";
import { IRating } from 'src/app/models/rating.model';

@Component({
  selector: 'app-add-review-modal',
  templateUrl: './addReview.modal.html',
  styleUrls: ['./addReview.modal.scss']
})
export class AddReviewModalDialogComponent {
  public request: AddReviewModel = defaults.addReview;
  public rating: IRating = defaults.rating;
  public currentRate: number;
  public selectedFile: ImageSnippet;
  public files : ImageSnippet[] = [];
  public isAvailable: boolean = true;
  private photoCount: number = 6;

  processFile(imageInput: any) {
    const indexes = Object.keys(imageInput.files);
    indexes.forEach((index) => {
      const file = imageInput.files[index];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', (event: any) => {
        var loadedFile = new ImageSnippet(event.currentTarget.result, file);
        if (!this.files.find(x => x.src === loadedFile.src) && this.files.length < this.photoCount + 1) {
          this.files.push(loadedFile);
          const value = {source: loadedFile.src, title: this.request.title} as IImageModel;
          this.request.images.push(value);
        }
        this.isAvailable = !(this.files.length > this.photoCount);
      });
    });
  }

  constructor(
    public dialogRef: MatDialogRef<AddReviewModalDialogComponent>, public socialMedia: SocialMediaService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {objectIdE: string , rate: number, userIdE: string, isTripT: boolean},) {
      data.rate == 0
      ? this.currentRate = 3
      : this.currentRate = data.rate;

      if (this.data.isTripT) {
         this.request.tripId = this.data.objectIdE;
      }
      else{
         this.request.entertainmentId = this.data.objectIdE;
      }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async submit() {
    this.rating.entertainmentId = this.data.objectIdE;
    this.rating.value = this.currentRate;
    this.rating.userId = this.data.userIdE;
    this.request.userId = this.data.userIdE;
    if(!this.data.isTripT){
    await this.addReviewEntertainment();
    }else
    {
      await this.addReviewTrip();
    }
    this.request = defaults.addReview;
    }

    async addReviewTrip()
    {
      await this.socialMedia.addReviewTrip(this.request)
    .then((res: ReviewModel) => { this.rating.reviewId = res.id; })
    .then(() => Promise.all([
      this.socialMedia.addRating(this.rating),
      this.dialogRef.close(this.request)
    ]))
    .catch(() => {
      if (this.rating.reviewId !== "") {
        this.socialMedia.deleteReview(this.rating.reviewId);
      }
    });
    }

    async addReviewEntertainment()
    {
      await this.socialMedia.addReviewEnetrtainment(this.request)
    .then((res: ReviewModel) => { this.rating.reviewId = res.id; })
    .then(() => Promise.all([
      this.socialMedia.addRating(this.rating),
      this.dialogRef.close(this.request)
    ]))
    .catch(() => {
      if (this.rating.reviewId !== "") {
        this.socialMedia.deleteReview(this.rating.reviewId);
      }
    });
    }
}

export class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

