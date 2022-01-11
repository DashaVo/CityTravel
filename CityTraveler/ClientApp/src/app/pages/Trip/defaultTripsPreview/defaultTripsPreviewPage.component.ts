import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';

import { TripService } from "src/app/services/tripService";
import { SignupOrSigninModalDialogComponenet  } from 'src/app/modals/signInOrSignUp/signInOrSignUp';
import { AuthService } from 'src/app/services/generalServices/auth.service';
import { ITrip } from 'src/app/models/tripModel';

@Component({
    selector: "default-trips-preview",
    templateUrl: "./defaultTripsPreviewPage.component.html",
    styleUrls: ["./defaultTripsPreviewPage.component.scss"]
})

export class DefaultTripsPagePreviewComponent implements OnInit {

  public config={
    user:{
      id:'',
      isLoggedIn: false,
      isAdmin: false,
    }
  }

    public trips: ITrip[] = [];
    skip=0;
    take=10;
    public tripsCount: number;
    countOfPages:number;
    public editButtonOnClick: boolean;
    public tripDataToEdit: ITrip;



    constructor(
      private service: TripService,
      public dialog: MatDialog,
      public authService: AuthService,
      public router: Router)
      {
        this.trips = [];
    }

    async ngOnInit(){
        this.trips = await this.service.getDefaultTrips(this.skip, this.take);
        this.getUser();
    }

    getUser(){
      const user = this.authService.getUser();

      if(user){
        this.config.user.isLoggedIn = true;
        this.config.user.isAdmin = user.role ==="Admin";
      }
    }

    openSignUpOrSigninModal():void{
      this.getUser();
      if(!this.config.user.isLoggedIn){
        this.dialog.open(SignupOrSigninModalDialogComponenet, {
          panelClass: 'dialog-modal',
          data:{}
        });
      }
      else{
        this.router.navigate(['/new-trip']);
      }
    }
}




