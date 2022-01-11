import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder,} from '@angular/forms';
import {IUserProfile} from 'src/app/models/user.model';
import {UserManagementService} from 'src/app/services/userManagementService';
import {AuthService} from '../../../../services/generalServices/auth.service';

@Component({
  selector: 'user-profile',
  templateUrl: './userProfilePage.component.html',
  styleUrls: ['./userProfilePage.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  public userInfo: IUserProfile;
  @Input() public user: IUserProfile;
  @Input() public showButtons: boolean;
  public defaultAvatar = 'https://image.shutterstock.com/image-vector/female-photographer-holds-camera-takes-260nw-1395353831.jpg';
  isReadyToShow = false;
  constructor(
    private service: UserManagementService,
    private router: Router,
    private authService: AuthService
  ) {
  }
  ngOnInit(): void {
    this.userInfo = this.user;
    this.isReadyToShow = true;
    if (this.showButtons == false)
    {
      this.hidden = false;
    }
  }

  public error = null;
  public hidden = true;
  public result: boolean;

    delete() {
    if (confirm('Are you sure to delete profile?')) {
      console.log(this.userInfo.id)
      this.service.deleteUser(this.userInfo.id)
        .subscribe( (res: boolean) => {
          if (res) {
            this.authService.logout().then(() => {
              this.router.navigate(['']).then(() => window.location.reload());
            });
          }
          ( error: any) => {
            console.log(error);
            this.error = `User not deleted`;
            };
        });
    }
  }



  // submit() {
  //   this.error = null;
  //   this.userInfo.username = '';
  //   if (this.userIdForm.valid) {
  //     this.service.getUserProfile(this.userIdForm.value.username)
  //     .subscribe(
  //       (res: IUserProfile) => {
  //         this.userInfo = res;
  //       },
  //         (error) => {
  //           console.log('An unexpected error occured');
  //           console.log(error);
  //           this.error = `User not found by UserName "${this.userIdForm.value.username}"`;
  //     });
  //   }
  // }

}
