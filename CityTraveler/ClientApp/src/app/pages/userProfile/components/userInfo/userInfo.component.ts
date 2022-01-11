import { DefaultTrip } from './../../../../models/defaultTrip.model';
import {Component} from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {IUserProfile} from 'src/app/models/user.model';
import {UserManagementService} from 'src/app/services/userManagementService';

@Component({
  selector: 'user-info',
  templateUrl: './userInfo.component.html',
  styleUrls: ['./userInfo.component.scss']
})
export class UserInfoComponent {
  public users: IUserProfile[] = [];
  public defaultAvatarSrc = 'https://image.shutterstock.com/image-vector/female-photographer-holds-camera-takes-260nw-1395353831.jpg';

  userInfoForm = this.formBuilder.group({
    name: '',
    email: ['', Validators.email],
    gender: ''
  });

  public error = null;
  hidden = true;

  constructor(
    private service: UserManagementService,
    private formBuilder: FormBuilder,
  ) {
  }

  submit() {
    this.error = null;
    this.users = null;
    if (this.userInfoForm.valid) {
      this.service.getUsers(this.userInfoForm.value)
      .subscribe((res: IUserProfile[]) => {
        this.users = res;
      },
      (error) => {
        this.error = `Users not found`;
      });
    }
  }

}





