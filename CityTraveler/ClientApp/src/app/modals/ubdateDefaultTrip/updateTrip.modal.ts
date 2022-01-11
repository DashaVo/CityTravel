import { TripService } from './../../services/tripService';
import { ITrip, Trip } from 'src/app/models/tripModel';
import { tripData } from './../../models/initialValues';
import { Component, Inject, Input, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import * as defaults from "../../models/initialValues";

@Component({
  selector:'update-trip-modal',
  templateUrl:'./updateTrip.modal.html',
  styleUrls:["./updateTrip.modal.scss"],
})

export class UpdateTripModalDialogComponent implements OnInit{

  public tripData:ITrip;
  // constructor(public dialigRef:MatDialogRef<UpdateTripModalDialogComponent>,
  //   @Optional() @Inject(MAT_DIALOG_DATA) public data: {trip:ITrip}, public tripService: TripService ){
  //     this.tripData = data.trip
  // }

  constructor(public tripService: TripService ){}


  ngOnInit(): void {

  }

  onFileSelected(event: { target: { files: string | any[]; }; }){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ()=>{
        if(typeof reader.result === 'string'){
          this.tripData.mainImage.source = reader.result;
        }
      }
    }
  }


}
