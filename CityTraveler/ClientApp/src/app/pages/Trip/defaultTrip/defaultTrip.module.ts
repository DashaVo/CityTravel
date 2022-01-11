import { TripService } from "src/app/services/tripService";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DefautTripGalleryComponent } from "./defaultTripGalleryComponent/defaultTripGallery.component";
import { DefaultTripPageComponent } from "./defaultTripPage/defaultTripPage.component";
import { SocialMediaModule } from "../../socialMedia/socialMediaSearch.module";
import { EntertainmentExportModule } from "src/app/commonModules/entertainment-export.module";



@NgModule({
  declarations:[
    DefaultTripPageComponent,
    DefautTripGalleryComponent,
  ],
  imports:[
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    SocialMediaModule,
    EntertainmentExportModule,
    RouterModule.forRoot([
      { path: 'default-trip', component: DefaultTripPageComponent, pathMatch: 'full'},
    ])
  ],
  providers:[
    TripService
  ],
  bootstrap: [
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})

export class DefaultTripModule{}
