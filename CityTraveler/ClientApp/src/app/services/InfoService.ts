import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntertainmentPreview } from '../models/entertainment.preview.model';
import { InfoDataService } from './InfoService.data';
import {IDefaultTrip} from '../models/defaultTrip.model';

@Injectable()
export class InfoService {

    constructor(private dataService: InfoDataService) {}

    getUserPopularEntertainment(userId: string): Observable<IEntertainmentPreview> {
        return this.dataService.getUserPopularEntertainment(userId);
    }
    getPopularEntertainment(): Observable<IEntertainmentPreview> {
      return this.dataService.getPopularEntertainment();
  }
  getGetMostPopularTrip(): Observable<IDefaultTrip> {
      return this.dataService.getGetMostPopularTrip();
  }
  GetLastTripsByPeriod(): Observable<IDefaultTrip[]> {
    return this.dataService.GetLastTripsByPeriod();
  }
}
