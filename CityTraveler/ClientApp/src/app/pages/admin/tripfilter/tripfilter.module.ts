import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CardTripComponent } from '../card/card-trip/card-trip.component';
import { SearchTripComponent } from './search-trip/search-trip.component';
import { TripfilterComponent } from './tripfilter.component';
import { TripDetailComponent } from '../detail/trip-detail/trip-detail.component';
import { NavAdminModule } from '../nav-admin/nav.admin.module';



@NgModule({
  declarations: [
    SearchTripComponent,

  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    NavAdminModule
  ],
  exports:[
    SearchTripComponent,
  ],
  bootstrap: [TripfilterComponent]
})
export class TripFilterModule { }
