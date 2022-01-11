import { IDefaultTripPreview } from 'src/app/models/defaultTripPreviewModel';
import { IFilterTrips } from 'src/app/models/filters/filterTrips';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IAdminTripPreview } from 'src/app/models/filters/trip.admin.model';
import { IFilterAdminTrips } from 'src/app/models/filters/filterTrip.admin';
import { skip, take } from 'rxjs/operators';

@Component({
  selector: 'tripfilter',
  templateUrl: './tripfilter.component.html',
  styleUrls: ['./tripfilter.component.scss']
})
export class TripfilterComponent implements OnInit {

  constructor(private service: AdminService) { }
  trips: IAdminTripPreview[]=[];
  sum = 0;
  throttle = 150;
  scrollDistance = 1;
  filter:IFilterAdminTrips={

    tripStart: new Date('August 19, 1975 23:15:30'),
    tripEnd: new Date('August 19, 2022 23:15:30'),
    entertainmentName: "",
    user: "",
    priceMore: 0,
    priceLess: 10000,
    averageRatingMore: 0,
    averageRatingLess: 5,
    title: "",
    description: "",
    tripStatus: 4
  }
  async ngOnInit() {
    await this.FilterTrips(this.filter,0,10);
  }
  async onScrollDown(ev) {
    console.log("scrolled down!!", ev);
    const start = this.sum;
    this.sum += 10;
    this.trips = [...this.trips,...await this.service.FilterTrips(this.filter,this.sum,10)];
  }
  async FilterTrips($event : IFilterAdminTrips,skip:number,take:number){

    this.filter=$event;
    this.sum=0;
    this.trips = await this.service.FilterTrips(this.filter,skip,take);
  }


}
