import {Component, OnInit} from '@angular/core';
import {IDefaultTrip} from 'src/app/models/defaultTrip.model';
import {InfoService} from 'src/app/services/InfoService';

@Component({
  selector: 'popular-trip',
  templateUrl: './popularTrip.component.html',
  styleUrls: ['./popularTrip.component.scss']
})
export class PopularTripComponent implements OnInit {
  public popularTripInfo: IDefaultTrip ={
    id:'',
    title: '',
    description: '',
    tagString: '',
    price: '',
    averageRating: '',
    optimalSpent: new Date,
    images: [],
    entertainments: [],
    users: [],
    tripStatus: 4,
    reviews: [],
    realSpent: undefined
  };
  public defaultTripImagesSrc = [
    'https://picsum.photos/400/400?random=1',
    'https://picsum.photos/400/400?random=2',
    'https://picsum.photos/400/400?random=3',
    'https://picsum.photos/400/400?random=4',
  ];

  constructor(private service: InfoService) {  }

  ngOnInit() {
    this.service.getGetMostPopularTrip()
    .subscribe((res: IDefaultTrip) => {this.popularTripInfo = res;
    });
  }
  }
