import { TripService } from './../../../services/tripService';
import { ITripPreviewModel } from 'src/app/models/tirpPreview.model';
import { Component, Inject, Optional, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'add-to-trip-modal',
  templateUrl: './addToTrip.modal.html',
  styleUrls: ['./addToTrip.modal.scss']
})
export class AddToTripModalComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<AddToTripModalComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: {userId: string, entertainmentId: string},
  public tripService: TripService) {
    this.userId = data.userId;
    this.entertainmentId = data.entertainmentId;
  }

  public isReadyToShow = false;
  public entertainmentId = "";
  public userId = "";
  public trips = [];

  ngOnInit() {
    this.getTrips();
  }

  getTrips() {
    this.isReadyToShow = false;
    this.tripService.getTripsByUserId(this.userId)
    .then((res: ITripPreviewModel[]) => {
      this.isReadyToShow = true;
      this.trips = res
    });
  }

  addEntertainmentToTrip(tripId: string, entertainmentId: string) {
    this.tripService.addEntertainmentToTrip(tripId, entertainmentId)
    .then(() => {
      this.closeModal();
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
