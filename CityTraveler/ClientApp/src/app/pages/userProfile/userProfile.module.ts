import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserManagementDataService } from 'src/app/services/userManagementService.data';
import {UserManagementService } from 'src/app/services/userManagementService';
import {InfoDataService } from 'src/app/services/InfoService.data';
import {InfoService } from 'src/app/services/InfoService';
import {UserProfileComponent } from './userProfile.component';
import {UserProfilePageComponent } from './components/userProfilePage/userProfilePage.component';
import {UserInfoComponent } from './components/userInfo/userInfo.component';
import {UpdateUserComponent } from './components/updateUser/updateUser.component';
import {GetUserRangeComponent } from './components/getUserRange/getUserRange.component';
import {MatButtonModule, MatCardModule} from '@angular/material';
import { PopularUserEntrComponent } from './components/popularUserEntr/popularUserEntr.component';
import { UserProfileRoutingModule } from './userprofilerouting.module';


@NgModule({
    declarations: [
        UserProfileComponent,
        UserProfilePageComponent,
        UserInfoComponent,
        UpdateUserComponent,
        GetUserRangeComponent,
        PopularUserEntrComponent,
    ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'user', component: UserProfileComponent, pathMatch: 'full'},
    ]),
    MatCardModule,
    MatButtonModule,
    UserProfileRoutingModule
  ],
    providers: [
        UserManagementDataService,
        UserManagementService,
        InfoDataService,
        InfoService,
    ],
    bootstrap: [UserProfileComponent],
    exports: [
      UserProfilePageComponent,
    ]
})
export class UserProfileModule {}

