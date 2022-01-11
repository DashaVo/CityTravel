import { tripData } from './../../../../models/initialValues';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ITrip, Trip } from 'src/app/models/tripModel';
import { TripService } from '../../../../services/tripService';
import { Subscription } from 'rxjs';


@Component({
  selector:'user-trip',
  templateUrl:'./userTripPage.component.html',
  styleUrls:['./userTripPage.component.scss'],
})

export class UserTripPageComponent implements OnInit{

  //public userTrip: Trip = tripData;
  public userTrip: ITrip = {
    id: "",
    title: "",
    description: "",
    averageRating: "",
    realSpent: new Date(),
} as ITrip;

  private querySubscription: Subscription;
  constructor (
    private tripService: TripService,
    public activeRoute: ActivatedRoute,
    private router: Router){
  }

  async ngOnInit(){
    this.activeRoute.queryParams.subscribe(params=>{
     this.tripService.getTripById(params['tripId']).then((res:ITrip)=>{
        this.userTrip = res;
     });
    })
  }



  deleteTrip(){
    this.tripService.deleteTrip(this.userTrip.id);
    this.router.navigate(['/my-trips'])
  }

}
