import { SocialMediaService } from './../../../../services/socialMediaService';
import { AdminService } from 'src/app/services/admin.service';

import { UserManagementService } from 'src/app/services/userManagementService';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IUpdateUserData, IUserProfile } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserModalDialogComponent } from 'src/app/modals/update/user/user.component';
import { DeleteModalDialogComponent } from 'src/app/modals/delete/delete.modal';
import { IReviewPreviewModel } from 'src/app/models/reviewPreview.model';
import { IAdminReviewPreview } from 'src/app/models/filters/trip.admin.model';
import { ICommentModel, ICommentPreview } from 'src/app/models/comment.model';
import { TripService } from 'src/app/services/tripService';
import { IDefaultTrip } from 'src/app/models/defaultTrip.model';
import { ITripPreviewModel } from 'src/app/models/tirpPreview.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user:IUserProfile;
  reviews: IAdminReviewPreview[] = [];
  comments: ICommentModel[] = [];
  trips: ITripPreviewModel[]= [];
  userName: string;

  constructor(private socialservice: SocialMediaService,private userservice: UserManagementService,private service: AdminService,
      private route: ActivatedRoute,public dialog: MatDialog,private tripservice: TripService) { }

  openUpdateModal(){
    const dialogRef = this.dialog.open(UserModalDialogComponent, {
      width: '300px',
      panelClass: 'dialog-modal',
      data: {
        email: this.user.email,
        userName: this.user.userName,
        name: this.user.name ,
        avatarSrc: this.user.avatarSrc}
    });
    dialogRef.afterClosed().subscribe(async (result: IUpdateUserData) => {

        this.userservice.updateUser(result).subscribe(res => { res = this.user; });
        this.user.name = result.name;
        this.user.avatarSrc = result.avatarSrc;
        this.user.email = result.email;
        this.user.userName = result.userName;
     console.log("update item id ",result, this.user.userName)
    });
    window.scroll(0, 0);
  }
  async ngOnInit() {
      this.route.paramMap.subscribe(
          param => { let user =  param.get('username');
          console.log(user)
          this.userName = user;
         })
          this.user = await this.service.getUserByUsername(this.userName);
          console.log("q",this.user)
          this.trips = await this.tripservice.getTripsByUserId(this.user.id);
        console.log(this.trips);
        this.comments = await this.socialservice.getCommentsByUserId(this.user.id);
        console.log(this.comments);
        this.reviews = await this.service.ReviewsByUser(this.user.userName);
        console.log(this.reviews);

    }
    openDeleteModal(): void {

      const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
        width: '300px',
        panelClass: 'dialog-modal',
        data: { email: '', password: '', isPersistent: false }
      });
      dialogRef.afterClosed().subscribe(async (result: boolean) => {

       console.log("delete item id ",result )
      });
      window.scroll(0, 0);
    }


}


