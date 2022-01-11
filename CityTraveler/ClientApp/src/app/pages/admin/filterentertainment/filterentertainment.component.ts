
import { Component, OnInit } from '@angular/core';
import { IFilterEntertainments } from 'src/app/models/filters/filtertEntertainments';
import { AdminService } from 'src/app/services/admin.service';
import { IEntertainmentPreview } from 'src/app/models/entertainment.preview.model';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { IFilterAdminEntertainments } from 'src/app/models/filters/filterEntertaiments.admin';


@Component({
  selector: 'entertainmentfilter',
  templateUrl: './filterentertainment.component.html',
  styleUrls: ['./filterentertainment.component.scss']
})
export class FilterentertainmentComponent implements OnInit {

  constructor(private service: AdminService,public loaderService: LoaderService) { }
  filter:IFilterAdminEntertainments={
    title: "",
    description: "",
    streetName: "",
    type: 4,
    averagePriceLess: 1000,
    averagePriceMore: 0,
    averageRatingMore: 0,
    averageRatingLess: 5
  }

  entertaiments: IEntertainmentPreview[] = [];
  sum = 0;
  throttle = 150;
  scrollDistance = 1;
  async ngOnInit() {
    await this.FilterEntertaiments(this.filter,0,10);
  }



  async onScrollDown(ev) {
    console.log("scrolled down!!", ev);
    this.sum += 10;
    this.entertaiments = [...this.entertaiments,...await this.service.FilterEntertaiments(this.filter,this.sum,10)];
  }


  async FilterEntertaiments($event: IFilterAdminEntertainments,skip:number,take:number){
    console.log($event);
    this.filter=$event;
    this.sum=0;

    this.entertaiments = await this.service.FilterEntertaiments(this.filter,skip,take);
  }
}
