import { TripService } from "src/app/services/tripService";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserTripsPreviewComponent } from "./userTripsPreview/user.TripsPreview.component";
import { UserTripPageComponent } from "./userTripPage/userTripPage.component";

@NgModule({
  declarations:[
    UserTripsPreviewComponent,
    UserTripPageComponent
  ],
  imports:[
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'my-trips', component:UserTripsPreviewComponent, pathMatch:'full'},
      {path:'my-trip/:tripId', component:UserTripPageComponent, pathMatch:'full'}
    ])
  ],
  providers:[
    TripService
  ],
  bootstrap: [
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class UserTripsModule{}
