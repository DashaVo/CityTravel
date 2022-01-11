import { Router } from '@angular/router';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SignupOrSigninModalDialogComponenet  } from 'src/app/modals/signInOrSignUp/signInOrSignUp';
import { AuthService } from 'src/app/services/generalServices/auth.service';
import { ITrip } from 'src/app/models/tripModel';
import * as defaults from "../../../models/initialValues";
import { UpdateTripModalDialogComponent } from 'src/app/modals/ubdateDefaultTrip/updateTrip.modal';
import { EventEmitter } from '@angular/core';

@Component({
    selector: "default-trip-preview",
    templateUrl: "./trip-template.html",
    styleUrls: ["./trip-template.scss"]
})

export class DefaultTripPreviewComponent implements OnInit {

  public config={
    user:{
      id:'',
      isLoggedIn: false,
      isAdmin: false,
    }
  }
  public trip: ITrip = defaults.defaultTrip;
  isReadyToShow= false;

  @Input() newTrip: ITrip;
  @Input() isVisible: boolean = false;
  @Output() openEditTripModalEmitter: EventEmitter<{isClicked: boolean, data:ITrip}> = new EventEmitter();

  openEditTripModal(isClicked: boolean, data: ITrip){
    this.openEditTripModalEmitter.emit({isClicked:isClicked, data: data})
  }

    constructor(
      public dialog: MatDialog,
      public authService: AuthService,
      public router: Router)
      {}


    ngOnInit(){
        this.getUser();
        this.trip = this.newTrip;
        this.isReadyToShow = true;
        this.authService.getRefresh().subscribe((res:boolean)=>{
          if(res){
            this.getUser()
          }
        })
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




