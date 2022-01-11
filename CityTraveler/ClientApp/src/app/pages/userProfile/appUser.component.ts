import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/generalServices/auth.service';
import { IUserProfile} from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from 'src/app/services/tripService';
import { ITripPreviewModel } from 'src/app/models/tirpPreview.model';

@Component({
    selector: 'app-user',
    templateUrl: './appUser.component.html',
    styleUrls: ['./appUser.component.scss']
})
export class UserComponent implements OnInit {
  public user: IUserProfile;
  public trips: ITripPreviewModel[];
  public defaultAvatar = 'https://image.shutterstock.com/image-vector/female-photographer-holds-camera-takes-260nw-1395353831.jpg';
  public defaultImagesSrc = [
    'https://picsum.photos/300/200?random=1',
    'https://picsum.photos/350/350?random=2',
    'https://picsum.photos/300/250?random=3',
    'https://picsum.photos/300/250?random=4',
    'https://picsum.photos/300/250?random=5',
    'https://picsum.photos/300/200?random=6'
  ];

  constructor(private service: AuthService, public tripService: TripService, private router: Router) {}

  ngOnInit() {
    this.user = this.service.getUser();
    this.getTrips();
  }
  getTrips() {
    this.tripService.getTripsByUserId(this.user.id)
    .then((res: ITripPreviewModel[])=>{
      this.trips = res;
      console.log(this.trips, 11111)
    })
  }

}
