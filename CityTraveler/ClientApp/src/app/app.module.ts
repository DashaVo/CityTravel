import { MapModule } from './pages/map/map.module';
import { ReviewPreviewComponent } from './pages/socialMedia/reviewPreview.component/reviewPreview.component';
import { ReviewByIdComponent } from './pages/socialMedia/reviewById/reviewById.component';
import { AddReviewModalDialogComponent } from './modals/socialmedia/addReview.modal';
import { ModalsModule } from './modals/modals.module';
import { AuthService } from './services/generalServices/auth.service';
import { StorageService } from './services/generalServices/storage.service';
import { ApiService } from './services/generalServices/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { UserManagementService } from './services/userManagementService';
import { UserManagementDataService } from './services/userManagementService.data';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminService } from './services/admin.service';
import { SocialMediaService } from './services/socialMediaService';
import { DefaultTripsPagePreviewComponent } from './pages/Trip/defaultTripsPreview/defaultTripsPreviewPage.component';
import { TripService } from './services/tripService';
import { EntertainmentModule } from './pages/Entertainment/entertainment.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"
import { InfoModule} from './pages/info/info.module';
import { UserProfileModule } from './pages/userProfile/userProfile.module';
import { InfoDataService } from './services/InfoService.data';
import { InfoService } from './services/InfoService';
import { FooterComponenet } from './footer/footer.component';
import { DefaultTripPreviewPaginationComponenet } from './pages/Trip/defaultTripsPreview/defaultTripPreviewPagination.component';
import { AdminModule } from './pages/admin/admin.module';
import { EntertainmentExportModule } from './commonModules/entertainment-export.module';
import { TripModule } from './pages/Trip/trip.module';
import { SocialMediaModule } from './pages/socialMedia/socialMediaSearch.module';
import { DefaultTripPreviewComponent } from './pages/Trip/trip-template/trip-template';

@NgModule({
  entryComponents: [
    AddReviewModalDialogComponent
  ],
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AdminComponent,
    DefaultTripsPagePreviewComponent,
    AddReviewModalDialogComponent,
    FooterComponenet,
    DefaultTripPreviewPaginationComponenet,
  ],

  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'admin', component: AdminComponent},
      { path: 'default-trips-preview', component: DefaultTripsPagePreviewComponent, pathMatch: 'full'},
      {path: 'reviewSee/:id', component: ReviewByIdComponent, pathMatch: 'full'}
    ]),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    EntertainmentModule,
    EntertainmentExportModule,
    MapModule,
    ModalsModule,
    NgbModule,
    AdminModule,
    InfoModule,
    UserProfileModule,
    TripModule,
    SocialMediaModule
  ],
  providers: [
    UserManagementService,
    UserManagementDataService,
    InfoDataService,
    InfoService,
    AdminService,
    TripService,
    ApiService,
    StorageService,
    AuthService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
