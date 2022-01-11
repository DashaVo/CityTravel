import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { NewTrip } from 'src/app/models/newTripModel';
import { TripService } from "src/app/services/tripService";



@Component({
  selector:'selected-entertainments',
  templateUrl:"./selectedEntertainments.component.html",
  styleUrls:["./selectedEntertainments.scss"]
})
export class SelectedEntertainmentsComponent implements OnInit, OnChanges {

  constructor(){}

  @Input()  entertainment: string;
  public entertainments: Array<string> = [ ];

  ngOnChanges(changes: SimpleChanges): void {
    for( let i in changes){
      this.entertainments.push(this.entertainment)
    }
  }
  public resetEntertainments(){
    this.entertainments = [];
  }
  ngOnInit(): void {

  }

}
