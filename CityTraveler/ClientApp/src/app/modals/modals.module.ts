import { EntertainmentExportModule } from '../commonModules/entertainment-export.module';
import { TripPreviewComponent } from './../pages/Entertainment/components/trip/tripPreview.component';
import { EmptyComponent } from './../pages/Entertainment/components/empty/empty.component';
import { AddReviewModalDialogComponent } from './socialmedia/addReview.modal';
import { DeleteModalDialogComponent } from './delete/delete.modal';
import { GalleryModalComponent } from './gallery/gallery.modal';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalDialogComponent } from './login/login.modal';
import { RegisterModalDialogComponenet } from './register/register.modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AddToTripModalComponent } from './entertainment/addToTrip/addToTrip.modal';
import { RatingComponent } from '../pages/Entertainment/components/rating.component/rating.component';
import { MainImageComponent } from '../pages/Entertainment/components/mainImage/main.image.component';
import { EntertainmentPreviewComponent } from '../pages/Entertainment/entertainmentPreview/entertainment.preview.component';
import { LoadingComponent } from '../pages/Entertainment/components/loading/loading.component';
import { SignupOrSigninModalDialogComponenet } from './signInOrSignUp/signInOrSignUp';
import { EntertaimentModalDialogComponent } from './update/entertaiment/entertaiment.component';
import { AddressComponent } from './update//address/address.component';
import { TripModalDialogComponent } from './update/trip/trip.component';
import { ReviewModalDialogComponent } from './update/review/review.component';
import { UserModalDialogComponent } from './update/user/user.component';
import { UpdateTripModalDialogComponent } from './ubdateDefaultTrip/updateTrip.modal';

@NgModule({
    entryComponents: [
      LoginModalDialogComponent,
      DeleteModalDialogComponent,
      //AddReviewModalDialogComponent
      GalleryModalComponent,
      AddToTripModalComponent,
      RegisterModalDialogComponenet,
      SignupOrSigninModalDialogComponenet,
      UpdateTripModalDialogComponent,
      UserModalDialogComponent    
],
    declarations: [
      LoginModalDialogComponent,
      DeleteModalDialogComponent,
      //AddReviewModalDialogComponent
      LoginModalDialogComponent,
      GalleryModalComponent,
      AddToTripModalComponent,
      RegisterModalDialogComponenet,
      SignupOrSigninModalDialogComponenet,
      EntertaimentModalDialogComponent,
      AddressComponent,
      TripModalDialogComponent,
      ReviewModalDialogComponent,
      UserModalDialogComponent,
      UpdateTripModalDialogComponent
    ],
    imports: [
      CommonModule,
      BrowserAnimationsModule,
      MatDialogModule,
      FormsModule,
      MatIconModule,
      EntertainmentExportModule
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
    ]
})
export class ModalsModule { }
