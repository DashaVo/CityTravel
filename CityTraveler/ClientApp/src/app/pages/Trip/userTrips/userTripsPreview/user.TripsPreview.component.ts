import { tripData } from './../../../../models/initialValues';
import { ITrip, Trip } from 'src/app/models/tripModel';
import { AuthService } from '../../../../services/generalServices/auth.service';
import { TripService } from '../../../../services/tripService';
import { Component, OnInit} from '@angular/core';


@Component({
  selector:'user-trips',
  templateUrl:'./userTripsPreview.component.html',
  styleUrls:['./userTripsPreview.component.scss'],
})
export class UserTripsPreviewComponent implements OnInit{

  constructor (public tripService: TripService, private authService: AuthService){}

  public userId: string;
  public trips: ITrip[] = [];

  ngOnInit(): void {
    this.getUser();
    this.getTrips();
  }

  getUser() {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user.id;
    }
  }

  getTrips(){
    this.tripService.getUserTrips(this.userId)
    .then((res: ITrip[])=>{
      this.trips = res;
    })
  }

}
