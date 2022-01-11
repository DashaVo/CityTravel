import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { IAdminAddress } from 'src/app/models/adminAddress.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'addressfilter',
  templateUrl: './addressfilter.component.html',
  styleUrls: ['./addressfilter.component.scss'],
  providers:[ AdminService]

})
export class AddressfilterComponent implements OnInit {

  filter: string="";
  testAddress : IAdminAddress = {
    houseNumber: "houseNumber 23",
    apartmentNumber: "apartmentNumber 22",
    street : {
    id: "test id",
    title: " test title"}
  };
  sum = 0;
  throttle = 150;
  scrollDistance = 1;
  addresses: IAdminAddress[] = [];
  constructor(private service: AdminService) { }

  ngOnInit() {
      this.FilterAddress(this.filter,0,10);
  }
  async onScrollDown(ev) {
    console.log("scrolled down!!", ev);

    // add another 20 items
    const start = this.sum;
    this.sum += 10;
    this.addresses = [...this.addresses,...await this.service.FilterAddressStreets(this.filter,this.sum,10)];
  }


  async FilterAddress($event: string,skip:number,take:number) {

    this.filter=$event;
    this.sum=0;
    this.addresses = await this.service.FilterAddressStreets(this.filter,skip,take);

  }

}
