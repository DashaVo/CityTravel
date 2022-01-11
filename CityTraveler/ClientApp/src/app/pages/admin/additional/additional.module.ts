import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardcommentComponent } from './cardcomment/cardcomment.component';
import { InfopointComponent } from './infopoint/infopoint.component';
import { DescriptionComponent } from './description/description.component';
import { SeeMoreComponent } from './see-more/see-more.component';



@NgModule({
  declarations: [CardcommentComponent, InfopointComponent, DescriptionComponent, SeeMoreComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  exports:[
    CardcommentComponent, InfopointComponent, DescriptionComponent, SeeMoreComponent
  ]
})
export class AdditionalModule { }
