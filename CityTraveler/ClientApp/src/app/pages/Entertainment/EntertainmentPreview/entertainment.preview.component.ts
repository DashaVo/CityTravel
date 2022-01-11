import { TripService } from 'src/app/services/tripService';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IEntertainmentPreview } from 'src/app/models/entertainment.preview.model';
import * as defaults from "../../../models/initialValues";

@Component({
  selector: 'entertainment-preview',
  templateUrl: './entertainment.preview.component.html',
  styleUrls: ['./entertainment.preview.component.scss']
})
export class EntertainmentPreviewComponent implements OnInit{
  public config: IEntertainmentPreview = defaults.entertainmentPreview;

  constructor(public tripService: TripService) { }

  @Input() newConfig: IEntertainmentPreview;
  @Input() isBtnVisible: boolean= false;
  @Output() addToTripEmitter: EventEmitter<{id: string, title: string}> = new EventEmitter();

  public isReadyToShow = false;
  public defaultImage = "https://atlas-content-cdn.pixelsquid.com/stock-images/mini-house-doll-WyXEB61-600.jpg";

  ngOnInit() {
    this.config = this.newConfig;
    this.isReadyToShow = true;
  }
  addEntertainmentToTrip(id: string, title: string){
    this.addToTripEmitter.emit({id:id, title:title})
  }
}
