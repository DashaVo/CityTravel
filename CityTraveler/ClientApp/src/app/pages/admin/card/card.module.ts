import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CardReviewComponent } from './card-review/card-review.component';
import { CardTripComponent } from './card-trip/card-trip.component';
import { CardUserComponent } from './card-user/card-user.component';
import { CardEntertainmentComponent } from './card-entertainment/card-entertainment.component';
import { CardHistoryComponent } from './history-card/history-card.component';
import { CardAddressComponent } from './address-card/address-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    CardReviewComponent,
    CardTripComponent,
    CardUserComponent,
    CardHistoryComponent,
    CardEntertainmentComponent,
    CardAddressComponent

    
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    MatIconModule,
  ]
  ,
  exports:[
    
    CardReviewComponent,
    CardTripComponent,
    CardUserComponent,
    CardHistoryComponent,
    CardEntertainmentComponent,
    CardAddressComponent
  ]
})
export class CardModule { }
