import { AddNewTripModule } from './addNewTrip/addNewTrip.module';
import { UserTripsModule } from './userTrips/userTrips.module';
import { DefaultTripModule } from './defaultTrip/defaultTrip.module';
import { TripService } from "src/app/services/tripService";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations:[
  ],
  imports:[
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    UserTripsModule,
    DefaultTripModule,
    FormsModule,
    ReactiveFormsModule,
    AddNewTripModule
  ],

  providers:[
    TripService
  ],
  bootstrap: [
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class TripModule{}
