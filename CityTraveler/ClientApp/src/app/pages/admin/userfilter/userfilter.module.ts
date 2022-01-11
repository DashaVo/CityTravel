import { UserManagementService } from 'src/app/services/userManagementService';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserfilterComponent } from './userfilter.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { CardUserComponent } from '../card/card-user/card-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserDetailComponent } from '../detail/user-detail/user-detail.component';
import { NavAdminModule } from '../nav-admin/nav.admin.module';



@NgModule({
  declarations: [
    SearchUserComponent,


  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    NavAdminModule
  ],
  providers:[
  ],
  exports:[
    SearchUserComponent
  ],
  bootstrap: [UserfilterComponent]
})
export class UserFilterModule { }
