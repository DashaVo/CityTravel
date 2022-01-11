import { TripService } from "src/app/services/tripService";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NewTripComponentPage } from "./addNewTripPage/addNewTripPage.component";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from 'src/app/alerts/alert.component';
import { EntertainmentExportModule } from 'src/app/commonModules/entertainment-export.module';
import { SelectedEntertainmentsComponent } from "./selectedEntertainments/selectedEntertainments.component";
import { SocialMediaModule } from "../../socialMedia/socialMediaSearch.module";

@NgModule({
  declarations:[
    NewTripComponentPage,
    AlertComponent,
    SelectedEntertainmentsComponent
  ],
  imports:[
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EntertainmentExportModule,
    SocialMediaModule,
    RouterModule.forRoot([
      { path: 'new-trip', component: NewTripComponentPage, pathMatch: 'full'},
    ])
  ],
  providers:[
    TripService
  ],
  bootstrap: [
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AddNewTripModule{}
