import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterentertainmentComponent } from './filterentertainment.component';
import { SearchEntertainmentComponent } from './search-entertainment/search-entertainment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NavAdminModule } from '../nav-admin/nav.admin.module';

@NgModule({
  declarations:[
    SearchEntertainmentComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    NavAdminModule,

  ],
  exports:[

    SearchEntertainmentComponent
  ],
  bootstrap: [FilterentertainmentComponent]
})
export class EntertainmentModule { }
