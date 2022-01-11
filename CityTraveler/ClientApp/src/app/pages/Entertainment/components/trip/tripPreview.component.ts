import { Component, Input, OnInit } from '@angular/core';
import * as defaults from "../../../../models/initialValues";
import { ITripPreviewModel } from '../../../../models/tirpPreview.model';

@Component({
  selector: 'trip-preview',
  templateUrl: './tripPreview.component.html',
  styleUrls: ['./tripPreview.component.scss']
})
export class TripPreviewComponent implements OnInit {
  public config: ITripPreviewModel = defaults.tripPreview;
  constructor() {}

  defaultImage = "https://m.media-amazon.com/images/I/31ZFmJVC2GL.jpg";

  @Input() newConfig: ITripPreviewModel;
  @Input() isReadMoreActive: boolean = true;

  ngOnInit() {
    this.config = this.newConfig;
  }
}
