import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressfilterComponent } from './addressfilter.component';
import { SearchAddressComponent } from './search-address/search-address.component';
import {MatIconModule} from '@angular/material/icon'
import { NavAdminModule } from '../nav-admin/nav.admin.module';

@NgModule({
  declarations: [
      SearchAddressComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NavAdminModule,
    RouterModule

  ],
  exports:[
    SearchAddressComponent,
  ],
  bootstrap: [AddressfilterComponent]
})
export class AddressFilterModule{ }
