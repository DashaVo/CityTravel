import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {IEntertainmentPreview} from 'src/app/models/entertainment.preview.model';
import {InfoService} from 'src/app/services/InfoService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'popular-entertainment',
  templateUrl: './popularEntertainment.component.html',
  styleUrls: ['./popularEntertainment.component.css']
})
export class PopularEntertainmentComponent {
  public popularEntertainmentInfo: IEntertainmentPreview = {
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
    reviewsCount: 0,
    averageRating: 0,
    mainImage: {
      source: '',
      title: ''
    },
    images: ""
  };
  public userId: string;
  public hidden = true;

  constructor(private service: InfoService) {
  }

  submit() {
    this.service.getPopularEntertainment().subscribe((res: IEntertainmentPreview) => {
      this.popularEntertainmentInfo = res;
    });
  }

}









