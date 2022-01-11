import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavAdminComponent } from './nav-admin.component';



@NgModule({
  declarations: [
    NavAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    RouterModule
  ],
  exports:[
    NavAdminComponent
  ]
})
export class NavAdminModule { }
