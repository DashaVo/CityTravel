import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {IUserProfile} from 'src/app/models/user.model';
import {UserManagementService} from 'src/app/services/userManagementService';

@Component({
  selector: 'user-range',
  templateUrl: './getUserRange.component.html',
  styleUrls: ['./getUserRange.component.scss']
})
export class GetUserRangeComponent {
  public users: IUserProfile[] = [];

  public hidden = true;
  public error = null;

  rangeForm = this.formBuilder.group({
    skip: 0,
    take: 0,
  });

  constructor(
    private service: UserManagementService,
    private formBuilder: FormBuilder
  ) {
  }

  submit() {
    this.users = null;
    this.error = null;
    this.service.getUserRange(this.rangeForm.value.skip, this.rangeForm.value.take)
      .subscribe((res: IUserProfile[]) => {
        this.users = res;
      },
      (error) => {
        console.log('An unexpected error occured');
        console.log(error);
        this.error = `Users not Found`;
  });
  }
}
