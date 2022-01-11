import { Component, Input, OnInit } from '@angular/core';
import { IReviewPreviewModel } from 'src/app/models/reviewPreview.model';
import * as defaults from "../../../models/initialValues";

@Component({
  selector: 'review-preview',
  templateUrl: './reviewPreview.component.html',
  styleUrls: ['./reviewPreview.component.scss']
})
export class ReviewPreviewComponent implements OnInit {
  public config: IReviewPreviewModel = defaults.reviewPreview;
  constructor() {}

  @Input() newConfig: IReviewPreviewModel;
  public defaultImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  ngOnInit() {
    this.config = this.newConfig;
  }
}
