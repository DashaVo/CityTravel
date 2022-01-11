import { ActivatedRoute } from '@angular/router';
import {Component, OnInit, Input} from '@angular/core';
import {InfoService} from 'src/app/services/InfoService';
import {AuthService} from
    '../../../../services/generalServices/auth.service';
import { UserProfileRoutingModule } from '../../userprofilerouting.module';
import { IEntertainmentShow } from 'src/app/models/entertainment.show.model';
import { StorageService } from 'src/app/services/generalServices/storage.service';

@Component({
  selector: 'user-entr',
  templateUrl: './popularUserEntr.component.html',
  styleUrls: ['./popularUserEntr.component.scss'],
})
export class PopularUserEntrComponent implements OnInit {
  public UserEntrInfo: IEntertainmentShow = {
    id: '',
    title: '',
    type: '',
    address: {
        street: {
            title: '',
        },
        houseNumber: '',
        apartmentNumber: '',
    },
    tripsCount: 0,
    description:'',
    reviewsCount: 0,
    averageRating: 0,
    averagePrice: {
      title: '',
      value: 0,
    },
    begin: '',
    end: '',
    images: [],
    mainImage: {
        source: '',
        title: '',
  }

}
  public userId: string;

  public defaultEntertainmentImagesSrc = [
    'https://picsum.photos/400/400?random=1',
    'https://picsum.photos/400/400?random=2',
    'https://picsum.photos/400/400?random=3',
    'https://picsum.photos/400/400?random=4',
  ];
  constructor(private service: InfoService,
     private authService: AuthService,
     private route:ActivatedRoute,
     private storageService: StorageService) {}


  ngOnInit() {
    this.route.paramMap.subscribe( param => {this.userId = param.get('Id')})

    console.log(this.userId)
    this.service.getUserPopularEntertainment(this.userId)
    .subscribe((res: IEntertainmentShow) => {
      this.UserEntrInfo = res;
    });
  }

}
