import { DeleteModalDialogComponent } from '../../../modals/delete/delete.modal';
import { TripService } from './../../../services/tripService';
import { MainImageComponent } from './../components/mainImage/main.image.component';
import { GalleryModalComponent } from './../../../modals/gallery/gallery.modal';
import { IReviewPreviewModel } from '../../../models/reviewPreview.model';
import { Component, OnInit } from '@angular/core';
import { IEntertainmentShow } from '../../../models/entertainment.show.model';
import { EntertainmentService } from '../../../services/entertainmentService';
import * as defaults from "../../../models/initialValues";
import { ActivatedRoute, Router } from '@angular/router';
import { SocialMediaService } from '../../../services/socialMediaService';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/generalServices/auth.service';
import { AddReviewModalDialogComponent } from '../../../modals/socialmedia/addReview.modal';
import { ReviewPreviewComponent } from '../../socialMedia/reviewPreview.component/reviewPreview.component';
import { AddToTripModalComponent } from '../../../modals/entertainment/addToTrip/addToTrip.modal';
import { ITripPreviewModel } from '../../../models/tirpPreview.model';
import { CityArchitectureService } from '../../../services/city.architecture.service';
import { SignupOrSigninModalDialogComponenet } from '../../../modals/signInOrSignUp/signInOrSignUp';

@Component({
  selector: 'entertainment',
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.scss']
})
export class EntertainmentShowComponent implements OnInit{
  public config: IEntertainmentShow = defaults.entertainmentShow;
  public cConfig = {
    user: {
      id: "",
      isLoggedIn: false,
      isAdmin: false,
    },
    review: {
      take: 5,
      all: [],
      pages: [],
      loading: [],
      activePage: 0,
      isReadyToShow: false,
    },
    trip: {
      take: 5,
      all: [],
      pages: [],
      loading: [],
      activePage: 0,
      isReadyToShow: false,
    },
    isReadyToShow: false,
    defaultImage: "https://atlas-content-cdn.pixelsquid.com/stock-images/mini-house-doll-WyXEB61-600.jpg"
  };

  constructor(
    private entertainmentService: EntertainmentService,
    private authService: AuthService,
    private tripService: TripService,
    private citySrvice: CityArchitectureService,
    private route: ActivatedRoute,
    private socialMediaServise: SocialMediaService,
    private dialog: MatDialog,
    private router: Router,
    public mainImage: MainImageComponent,
    public review: ReviewPreviewComponent,
  ) { }

  ngOnInit() {
    this.getUser();

    this.route.queryParams.subscribe(params => {
      this.getEntertainmentById(params['id']);
    });

    this.authService.getRefresh().subscribe((result: boolean) => {
      if (result) {
        this.getUser();
      }
    });
  }

  getUser() {
    const user = this.authService.getUser();

    if (user) {
      this.cConfig.user.isLoggedIn = true;
      this.cConfig.user.isAdmin = user.role === 'Admin';
      this.cConfig.user.id = user.id;
    }
  }

  getEntertainmentById(id: string) {
    try {
      this.entertainmentService.getEntertainment(id)
      .then((res: IEntertainmentShow) =>
        this.config = res)
      .then(() => {
        if (this.config.id == "00000000-0000-0000-0000-000000000000") {
          this.router.navigate(["/"])
        }

        else {
          const reviewPagesCount = Math.ceil(this.config.reviewsCount / this.cConfig.review.take);
          const tripPagesCount = Math.ceil(this.config.tripsCount / this.cConfig.trip.take);

          this.cConfig.review.pages = Array.from({length: reviewPagesCount}, (x, y) => y+1);
          this.cConfig.trip.pages = Array.from({length: tripPagesCount}, (x, y) => y+1);

          this.showReviews(1);
          this.showTrips(1);

          this.cConfig.isReadyToShow = true;
        }
      });
    }
    catch (ex) {
      console.log(ex);
      this.router.navigate(["/"]);
    }
  }

  showReviews(page: number) {
    this.cConfig.review.activePage = page;
    const skip = (page - 1) * this.cConfig.review.take;

    this.cConfig.review.all = [];
    this.cConfig.review.isReadyToShow = false;

    this.showLoading(skip, true);

    try {
      this.socialMediaServise.getObjectReviews(this.config.id, skip, this.cConfig.review.take)
      .then((res: IReviewPreviewModel[]) => {
        this.cConfig.review.isReadyToShow = true;
        this.cConfig.review.all = res
      });
    }
    catch (ex) {
      console.log(ex);
    }
  }

  showTrips(page: number) {
    this.cConfig.trip.activePage = page;
    const skip = (page - 1) * this.cConfig.review.take;

    this.cConfig.trip.all = [];
    this.cConfig.trip.isReadyToShow = false;

    this.showLoading(skip, false);

    try {
      this.tripService.getTripsByEntertainmentId(this.config.id, skip, this.cConfig.trip.take)
      .then((res: ITripPreviewModel[]) => {
        this.cConfig.trip.all = res
        this.cConfig.trip.isReadyToShow = true;
      });
    }
    catch (ex) {
      console.log(ex);
    }

  }

  showLoading(skip: number, isReview: boolean) {
    var residual = 0;

    isReview
    ? residual = this.config.reviewsCount - skip
    : residual = this.config.tripsCount - skip;

    const loadingCount = residual >= this.cConfig.review.take ? this.cConfig.review.take : residual;

    isReview
    ? this.cConfig.review.loading = Array.from({length: loadingCount}, (x) => true)
    : this.cConfig.trip.loading = Array.from({length: loadingCount}, (x) => true);
  }

  openGallery(): void {
    this.dialog.open(GalleryModalComponent, {
      panelClass: 'gallery-modal',
      data: this.config.images
    });
  }

  openAddReviewModal(ratingValue: number = 0) {
    if(this.cConfig.user.isLoggedIn) {
      this.dialog.open(AddReviewModalDialogComponent, {
        panelClass: 'dialog-modal',
        data: {
          objectIdE: this.config.id,
          rate: ratingValue,
          userIdE: this.cConfig.user.id,
          isTripT: false,
        }
      });
    }

    else {
      this.openSignUpOrSigninModal();
    }
  }

  openAddToTripModal() {
    if(this.cConfig.user.isLoggedIn) {
      this.dialog.open(AddToTripModalComponent, {
        panelClass: 'dialog-modal',
        data: {
          userId: this.cConfig.user.id,
          entertainmentId: this.config.id
        }
      });
    }

    else {
      this.openSignUpOrSigninModal();
    }
  }

  openSubmitModal() {
    const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
      width: '300px',
      panelClass: 'dialog-modal',
      data: {}
    });

    dialogRef.afterClosed().subscribe(
      async (submit: boolean) => {
        if (submit) {
          await this.citySrvice.deleteEntertainment(this.config.id);
          this.router.navigate(["/"]);
        }
      }
    );
  }

  openSignUpOrSigninModal() {
    if(!this.cConfig.user.isLoggedIn){
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
