import { SignupOrSigninModalDialogComponenet } from 'src/app/modals/signInOrSignUp/signInOrSignUp';
import { AddReviewModalDialogComponent } from 'src/app/modals/socialmedia/addReview.modal';
import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ReviewTemplate } from './../../../socialMedia/objectReviews/review-template';
import { AuthService } from 'src/app/services/generalServices/auth.service';
import { TripService } from "src/app/services/tripService";
import { MatDialog } from '@angular/material/dialog';
import { ITrip } from 'src/app/models/tripModel';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: "default-trip",
  templateUrl: "./defaultTripPage.component.html",
  styleUrls: ["./defaultTripPage.component.scss"],
})
export class DefaultTripPageComponent implements OnInit, OnDestroy {
  public defaultTrip: ITrip = {
      id: "",
      title: "",
      description: "",
      tagString: "",
      price: "",
      averageRating: "",
      optimalSpent: new Date(),
  } as ITrip;


  public isUserLoaded = true;
  public userId: string = "";
  public isLoggedIn: boolean = false;
  public userTrips: ITrip[] = [];
  private querySubscription: Subscription;

  @ViewChild(ReviewTemplate, { static: false }) review: ReviewTemplate;


  constructor(
    public activeRoute: ActivatedRoute,
    private tripService: TripService,
    private dialog: MatDialog,
    private authService: AuthService) {}

  async ngOnInit() {
    await this.getUser();
    this.userTrips = await this.tripService.getUserTrips(this.userId);

    this.querySubscription = this.activeRoute.queryParams.subscribe(async (queryParam: any) => {
      if (queryParam['tripId']) {
        this.defaultTrip.id = queryParam['tripId'];
        this.defaultTrip = await this.tripService.getDefaultTripById(queryParam['tripId']);
        await this.review.init();
      } else {
        console.error("Trip id is missing!!!");
      }
    })
  }

  ngOnDestroy() {
      this.querySubscription.unsubscribe();
  }


  async getUser() {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user.id;
      this.isLoggedIn=true;
    }
  }

  addToMyTrips(item: ITrip) {
    if (this.isLoggedIn) {
      this.userTrips.push(item)
    } else {
      this.openSignUpOrSigninModal();
    }
  }

  openSignUpOrSigninModal():void{
    if (!this.isLoggedIn) {
      this.dialog.open(SignupOrSigninModalDialogComponenet, {
        panelClass: 'dialog-modal',
        data:{}
      });
    }
  }

  openAddReviewModal(ratingValue: number = 0) {
    if (this.isLoggedIn) {
      this.dialog.open(AddReviewModalDialogComponent, {
        panelClass: 'dialog-modal',
        data: {
          objectIdE: this.defaultTrip.id,
          rate: ratingValue,
          userIdE: this.userId,
          isTripT: true,
        }
      });
    } else {
      this.openSignUpOrSigninModal();
    }
  }
}
