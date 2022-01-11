import { take } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { IFilterAdminUsers } from 'src/app/models/filters/filterUser.admin';
import { IUserProfile } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'userfilter',
  templateUrl: './userfilter.component.html',
  styleUrls: ['./userfilter.component.scss']
})
export class UserfilterComponent implements OnInit {

  constructor(private service: AdminService) { }
  users: IUserProfile[]=[];
  sum = 0;
  throttle = 150;
  scrollDistance = 1;
filter:IFilterAdminUsers={
  userName:"",
  gender: "male",
  email: "",
  name: "",
  phoneNumber:"",
  lockoutUser: false
}
  ngOnInit() {
    this.GetFilterUsers(this.filter,0,10)
  }
  async onScrollDown(ev) {
    console.log("scrolled down!!", ev);
    const start = this.sum;
    this.sum += 10;
    this.users = [...this.users,...await this.service.FilterUsers(this.filter,this.sum,10)];
  }

  async GetFilterUsers($event : IFilterAdminUsers,skip:number,take:number){


    this.filter=$event;
    this.sum=0;
    this.users = await this.service.FilterUsers(this.filter,skip,take);
    console.log(this.users);
  }
}
